import type { ReactNode } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function StatTile({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  className = '',
}: {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon?: ReactNode;
  className?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={`group rounded-xl border border-line bg-surface p-4 shadow-card transition-colors duration-200 hover:border-line-strong hover:bg-surface-raised ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-content-muted">{label}</p>
        {icon && (
          <span className="text-content-faint transition-colors duration-200 group-hover:text-content-secondary">
            {icon}
          </span>
        )}
      </div>
      <p className="num mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">{value}</p>
      {delta !== undefined && (
        <p
          className={`mt-1.5 inline-flex items-center gap-1 text-xs font-medium ${
            positive ? 'text-profit-bright' : 'text-loss-bright'
          }`}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className="num">
            {positive ? '+' : ''}
            {delta.toFixed(2)}%
          </span>
          {deltaLabel && <span className="font-normal text-content-muted">{deltaLabel}</span>}
        </p>
      )}
    </div>
  );
}

export default StatTile;
