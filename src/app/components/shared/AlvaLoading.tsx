import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface AlvaLoadingProps {
  size?: number;
  className?: string;
  tone?: 'light' | 'dark';
}

export function AlvaLoading({ size = 20, className, tone = 'light' }: AlvaLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `${import.meta.env.BASE_URL}logo-loading-${tone}.json`,
    });
    return () => { animRef.current?.destroy(); };
  }, [tone]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}
