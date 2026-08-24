export function formatUSD(value: number, opts: { compact?: boolean; sign?: boolean; decimals?: number } = {}): string {
  const { compact = false, sign = false, decimals = 2 } = opts;
  const abs = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact && abs >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: compact && abs >= 10000 ? 1 : decimals,
    minimumFractionDigits: compact && abs >= 10000 ? 0 : decimals,
  }).format(abs);
  if (sign) return `${value >= 0 ? '+' : '\u2212'}${formatted}`;
  return value < 0 ? `\u2212${formatted}` : formatted;
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatPct(value: number, decimals = 2): string {
  const abs = Math.abs(value).toFixed(decimals);
  return `${value >= 0 ? '+' : '\u2212'}${abs}%`;
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function formatRuntime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  if (d > 0) return `${d}d ${h}h`;
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}
