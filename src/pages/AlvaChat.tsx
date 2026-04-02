/**
 * [INPUT]: onNavigate from App.tsx
 * [OUTPUT]: 重定向到首页（chat 入口已移至首页 chatbox）
 * [POS]: pages — chat 列表页（已弃用，重定向）
 */

import { useEffect } from 'react';
import type { Page } from '@/app/App';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

export default function AlvaChat({ onNavigate }: Props) {
  useEffect(() => { onNavigate('home'); }, [onNavigate]);
  return null;
}
