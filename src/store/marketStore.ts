import { create } from 'zustand';
import { MARKETS } from '../data/markets';
import { mulberry32 } from '../lib/series';

export type LiveQuote = { symbol: string; price: number; change24h: number };

type MarketState = {
  quotes: Record<string, LiveQuote>;
  connected: boolean;
};

type MarketActions = {
  tick: () => void;
  setConnected: (v: boolean) => void;
};

export const useMarketStore = create<MarketState & MarketActions>()((set) => ({
  quotes: Object.fromEntries(
    MARKETS.map((m) => [m.symbol, { symbol: m.symbol, price: m.basePrice, change24h: m.change24h }]),
  ),
  connected: true,
  tick: () =>
    set((state) => {
      const rand = mulberry32(Date.now() & 0xffff);
      const next: Record<string, LiveQuote> = {};
      for (const key of Object.keys(state.quotes)) {
        const q = state.quotes[key];
        if (!q) continue;
        const drift = q.price * (rand() - 0.5) * 0.0009;
        next[key] = { ...q, price: Math.max(0.01, q.price + drift) };
      }
      return { quotes: next };
    }),
  setConnected: (v) => set({ connected: v }),
}));

let timer: ReturnType<typeof setInterval> | null = null;

export function ensureLiveFeed(): void {
  if (timer !== null || typeof window === 'undefined') return;
  timer = setInterval(() => useMarketStore.getState().tick(), 1600);
}

export function stopLiveFeed(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}
