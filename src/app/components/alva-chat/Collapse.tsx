/**
 * [INPUT]: open flag + children
 * [OUTPUT]: 平滑折叠/展开动画容器
 * [POS]: alva-chat — 通用折叠过渡
 */

import { useRef, useEffect, useState } from 'react';

interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
}

export function Collapse({ open, children }: CollapseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      /* 先设 0，下一帧读实际高度触发过渡 */
      setHeight(0);
      requestAnimationFrame(() => {
        if (ref.current) setHeight(ref.current.scrollHeight);
      });
    } else {
      /* 先设当前高度，下一帧设 0 触发过渡 */
      if (ref.current) setHeight(ref.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (open) setHeight(undefined); /* 展开完毕后解除固定高度 */
    else setVisible(false);
  };

  if (!visible && !open) return null;

  return (
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      style={{
        height: height != null ? height : 'auto',
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'height 0.25s ease-out, opacity 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
}
