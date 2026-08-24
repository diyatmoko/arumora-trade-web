import { useId, useMemo } from 'react';

export function Sparkline({
  points,
  positive,
  animated = false,
  className = '',
  strokeWidth = 2,
}: {
  points: number[];
  positive: boolean;
  animated?: boolean;
  className?: string;
  strokeWidth?: number;
}) {
  const gradId = useId();
  const W = 120;
  const H = 36;

  const { linePath, areaPath } = useMemo(() => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;
    const stepX = W / (points.length - 1);
    const coords = points.map((p, i) => {
      const x = i * stepX;
      const y = H - 3 - ((p - min) / span) * (H - 6);
      return [Number(x.toFixed(2)), Number(y.toFixed(2))] as const;
    });
    const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
    return {
      linePath: line,
      areaPath: `${line} L${W},${H} L0,${H} Z`,
    };
  }, [points]);

  const stroke = positive ? '#4ADE80' : '#F87171';
  const fillFrom = positive ? 'rgba(74,222,128,0.18)' : 'rgba(248,113,113,0.16)';
  const fillTo = 'rgba(10,15,24,0)';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-full w-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillFrom} />
          <stop offset="100%" stopColor={fillTo} />
        </linearGradient>
      </defs>
      {animated && (
        <path d={areaPath} fill={`url(#${gradId})`} data-fade-in style={{ opacity: 0 }} />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        {...(animated ? { 'data-draw': true } : {})}
      />
    </svg>
  );
}

export default Sparkline;
