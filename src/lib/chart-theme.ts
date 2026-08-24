export const CHART_COLORS = {
  bg: 'transparent',
  grid: 'rgba(148,163,184,0.07)',
  text: '#5D6C80',
  accent: '#22D3EE',
  profit: '#22C55E',
  loss: '#EF4444',
  areaTop: 'rgba(34,211,238,0.22)',
  areaBottom: 'rgba(34,211,238,0.01)',
  crosshair: 'rgba(154,169,189,0.4)',
} as const;

export const STATUS_TONE: Record<string, string> = {
  running: 'text-profit bg-profit-dim border-profit/25',
  paused: 'text-warn bg-warn-dim border-warn/25',
  stopped: 'text-content-muted bg-surface-overlay border-line-strong',
  error: 'text-loss bg-loss-dim border-loss/25',
};

export const RISK_TONE: Record<string, string> = {
  Low: 'text-profit bg-profit-dim',
  Medium: 'text-warn bg-warn-dim',
  High: 'text-loss bg-loss-dim',
};
