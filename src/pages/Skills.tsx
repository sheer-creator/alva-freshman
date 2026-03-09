/**
 * [INPUT]: AppShell, SkillModalContent
 * [OUTPUT]: Skills 全页面 — 左侧列表 + 右侧详情（非弹窗方案）
 * [POS]: 页面层 — Skills
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { SkillModalContent, SCROLL_STYLE } from '@/app/components/SkillModal';
import UserInfo from '@/app/components/UserInfo';

export default function Skills({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="skills"
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <style>{SCROLL_STYLE}</style>
        <div className="flex flex-col h-full">
          <SkillModalContent />
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
