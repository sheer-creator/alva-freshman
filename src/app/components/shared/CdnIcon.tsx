const CDN = 'https://alva-ai-static.b-cdn.net/icons';

export function CdnIcon({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  const url = `${CDN}/${name}.svg`;
  if (color) {
    return (
      <div
        className="block"
        style={{
          width: size, height: size,
          backgroundColor: color,
          WebkitMaskImage: `url(${url})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${url})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      />
    );
  }
  return <img src={url} alt={name} width={size} height={size} className="block" style={{ width: size, height: size }} />;
}
