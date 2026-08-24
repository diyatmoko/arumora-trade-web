export type CandlePoint = { time: number; open: number; high: number; low: number; close: number; volume: number };
export type LinePoint = { time: number; value: number };

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const HOUR = 3600;

const TF_SECONDS: Record<string, number> = {
  '1m': 60,
  '5m': 5 * 60,
  '15m': 15 * 60,
  '1H': HOUR,
  '4H': 4 * HOUR,
  '1D': 24 * HOUR,
  '1W': 7 * 24 * HOUR,
};

export type Timeframe = keyof typeof TF_SECONDS;

export const TIMEFRAMES = Object.keys(TF_SECONDS) as Timeframe[];

function candleCount(tf: Timeframe): number {
  switch (tf) {
    case '1m':
    case '5m':
    case '15m':
      return 160;
    default:
      return 120;
  }
}

export function generateCandles(symbol: string, tf: Timeframe, basePrice: number): CandlePoint[] {
  const rand = mulberry32(hashSeed(`${symbol}:${tf}`));
  const step = TF_SECONDS[tf];
  const now = Math.floor(Date.now() / 1000 / step) * step;
  const vol = 0.006 + rand() * 0.01;
  let price = basePrice * (0.82 + rand() * 0.12);

  const out: CandlePoint[] = [];
  for (let i = 0; i < candleCount(tf); i++) {
    const drift = (rand() - 0.47) * vol;
    const open = price;
    const close = Math.max(basePrice * 0.3, open * (1 + drift));
    const high = Math.max(open, close) * (1 + rand() * vol * 0.6);
    const low = Math.min(open, close) * (1 - rand() * vol * 0.6);
    out.push({
      time: now - (candleCount(tf) - 1 - i) * step,
      open,
      high,
      low,
      close,
      volume: (0.4 + rand()) * 1000 * (basePrice > 1000 ? 12 : 800),
    });
    price = close;
  }
  return out;
}

export function candlesToLine(candles: CandlePoint[]): LinePoint[] {
  return candles.map((c) => ({ time: c.time, value: c.close }));
}

export function sparkPoints(symbol: string, points = 32): number[] {
  const rand = mulberry32(hashSeed(`spark:${symbol}`));
  const out: number[] = [];
  let v = 50;
  for (let i = 0; i < points; i++) {
    v += (rand() - 0.48) * 8;
    v = Math.min(96, Math.max(4, v));
    out.push(v);
  }
  return out;
}

export function equitySeries(points = 180, endValue = 124582.42): LinePoint[] {
  const rand = mulberry32(20260824);
  const step = 24 * HOUR;
  const now = Math.floor(Date.now() / 1000 / step) * step;
  const start = endValue / 1.1742;
  let value = start;
  const growth = Math.pow(endValue / start, 1 / (points - 1));

  const out: LinePoint[] = [];
  for (let i = 0; i < points; i++) {
    value *= growth * (1 + (rand() - 0.5) * 0.008);
    if (i % 17 === 0) value *= 1 - rand() * 0.02;
    out.push({ time: now - (points - 1 - i) * step, value: Math.max(start * 0.9, value) });
  }
  out[out.length - 1] = { time: out[out.length - 1].time, value: endValue };
  return out;
}

export function monthlyReturns(): { month: string; value: number }[] {
  const labels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const values = [4.2, -1.8, 6.4, 3.1, 7.8, -2.4, 5.2, 1.9, 6.8, 3.4, 8.1, 2.6];
  return labels.map((month, i) => ({ month, value: values[i] }));
}
