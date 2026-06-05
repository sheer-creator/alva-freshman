export function TimelineConnectorLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-14px] top-[18px] w-[2px]"
      style={{
        left: 6,
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0 2px, transparent 2px 4px)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '2px 4px',
      }}
    />
  );
}

export function TimelineDot() {
  return (
    <div
      className="absolute left-1/2 top-[3px] z-[1] flex size-[14px] -translate-x-1/2 items-center justify-center rounded-full"
      style={{ background: '#F0F0F0' }}
    >
      <div className="size-[5px] rounded-full" style={{ background: '#ACACAC' }} />
    </div>
  );
}
