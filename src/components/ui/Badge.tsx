import type { ReactNode } from 'react';

export type Tone = 'profit' | 'loss' | 'warn' | 'info' | 'accent' | 'neutral';

const TONE: Record<Tone, string> = {
  profit: 'bg-profit-dim text-profit-bright border-profit/25',
  loss: 'bg-loss-dim text-loss-bright border-loss/25',
  warn: 'bg-warn-dim text-warn border-warn/25',
  info: 'bg-info-dim text-info border-info/25',
  accent: 'bg-accent-soft text-accent border-accent-line',
  neutral: 'bg-surface-overlay text-content-secondary border-line-strong',
};

export function Badge({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, Tone> = {
    running: 'profit',
    Running: 'profit',
    Open: 'profit',
    Filled: 'profit',
    Completed: 'profit',
    paused: 'warn',
    Paused: 'warn',
    Pending: 'warn',
    Partial: 'warn',
    Closing: 'warn',
    stopped: 'neutral',
    Stopped: 'neutral',
    Canceled: 'neutral',
    error: 'loss',
    Error: 'loss',
  };
  const tone = map[status] ?? 'neutral';
  return (
    <Badge tone={tone}>
      {tone === 'profit' && (
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-profit opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-profit" />
        </span>
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default Badge;
