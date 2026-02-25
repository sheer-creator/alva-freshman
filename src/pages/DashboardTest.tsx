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

const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: 'relative-perf', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'keyword-trends', x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-feed', x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-detail', x: 6, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
  ],
  md: [
    { i: 'relative-perf', x: 0, y: 0, w: 5, h: 5, minW: 4, minH: 4 },
    { i: 'keyword-trends', x: 5, y: 0, w: 5, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-feed', x: 0, y: 5, w: 5, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-detail', x: 5, y: 5, w: 5, h: 5, minW: 4, minH: 4 },
  ],
  sm: [
    { i: 'relative-perf', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'keyword-trends', x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-feed', x: 0, y: 10, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-detail', x: 0, y: 15, w: 6, h: 5, minW: 4, minH: 4 },
  ],
  xs: [
    { i: 'relative-perf', x: 0, y: 0, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'keyword-trends', x: 0, y: 5, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-feed', x: 0, y: 10, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'earnings-detail', x: 0, y: 15, w: 4, h: 5, minW: 4, minH: 4 },
  ],
  xxs: [
    { i: 'relative-perf', x: 0, y: 0, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'keyword-trends', x: 0, y: 5, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'earnings-feed', x: 0, y: 10, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'earnings-detail', x: 0, y: 15, w: 2, h: 5, minW: 2, minH: 4 },
  ],
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
