/**
 * [INPUT]: AppShell, Topbar, Widget 组件, react-grid-layout
 * [OUTPUT]: 可拖拽网格布局的测试看板
 * [POS]: 页面层 — Dashboard Test
 */

import { useState, useRef, useEffect } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { WIDGET_REGISTRY } from '@/widgets';
import { ResponsiveGridLayout, type Layout, type ResponsiveLayouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import '@/styles/dashboard-grid.css';

/* ========== 默认布局 ========== */

const WIDGET_IDS = ['relative-perf', 'keyword-trends', 'earnings-feed', 'earnings-detail'];

function buildLayout(cols: number, perRow: number, minW = 4): Layout[] {
  const w = cols / perRow;
  return WIDGET_IDS.map((id, idx) => ({
    i: id,
    x: (idx % perRow) * w,
    y: Math.floor(idx / perRow) * 5,
    w,
    h: 5,
    minW,
    minH: 4,
  }));
}

const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg:  buildLayout(12, 2),
  md:  buildLayout(10, 2),
  sm:  buildLayout(6,  1),
  xs:  buildLayout(4,  1),
  xxs: buildLayout(2,  1, 2),
};

const STORAGE_KEY = 'dashboardTestLayouts';

function loadLayouts(): ResponsiveLayouts {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.lg && Array.isArray(parsed.lg)) return parsed;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_LAYOUTS;
}

/* ========== 网格布局 ========== */

function WidgetGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [layouts, setLayouts] = useState<ResponsiveLayouts>(loadLayouts);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleLayoutChange = (_current: Layout, all: ResponsiveLayouts) => {
    setLayouts(all);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  };

  return (
    <div ref={containerRef} className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">
      <ResponsiveGridLayout
        className="layout w-full"
        layouts={layouts}
        width={containerWidth}
        breakpoints={{ lg: 750, md: 600, sm: 450, xs: 300, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        onLayoutChange={handleLayoutChange}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        resizeConfig={{ handles: ['se', 'sw', 'ne', 'nw'] }}
      >
        {DEFAULT_LAYOUTS.lg!.map(({ i: id }) => {
          const Widget = WIDGET_REGISTRY[id]?.component;
          return Widget ? <div key={id} className="widget-item"><Widget /></div> : null;
        })}
      </ResponsiveGridLayout>
    </div>
  );
}

/* ========== 页面 ========== */

export function DashboardTest({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="test" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="Dashboard Test" />
          <WidgetGrid />
        </div>
      </div>
    </AppShell>
  );
}
