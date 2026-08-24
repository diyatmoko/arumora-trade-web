export type BotStatus = 'running' | 'paused' | 'stopped' | 'error';

export type Bot = {
  id: string;
  name: string;
  strategy: string;
  market: string;
  status: BotStatus;
  runtimeSeconds: number;
  pnl: number;
  roiPct: number;
  winRate: number;
  trades: number;
};

export const BOTS: Bot[] = [
  { id: 'bot-btc-mom', name: 'BTC Momentum Bot', strategy: 'Momentum', market: 'BTC/USDT', status: 'running', runtimeSeconds: 345600 + 42600, pnl: 8421.6, roiPct: 24.8, winRate: 71.2, trades: 486 },
  { id: 'bot-eth-rev', name: 'ETH Mean Reversion', strategy: 'Mean Reversion', market: 'ETH/USDT', status: 'running', runtimeSeconds: 172800 + 21600, pnl: 4107.28, roiPct: 18.2, winRate: 66.4, trades: 312 },
  { id: 'bot-sol-sca', name: 'SOL Scalper', strategy: 'Scalping', market: 'SOL/USDT', status: 'paused', runtimeSeconds: 86400, pnl: 1284.9, roiPct: 9.6, winRate: 58.1, trades: 1104 },
  { id: 'bot-arb-liq', name: 'ARB Liquidation Hunter', strategy: 'Liquidation', market: 'ARB/USDT', status: 'running', runtimeSeconds: 259200, pnl: 2240.14, roiPct: 15.4, winRate: 63.8, trades: 198 },
  { id: 'bot-link-brk', name: 'LINK Breakout', strategy: 'Breakout', market: 'LINK/USDT', status: 'stopped', runtimeSeconds: 0, pnl: -214.62, roiPct: -1.8, winRate: 47.2, trades: 86 },
  { id: 'bot-avax-grid', name: 'AVAX Grid Engine', strategy: 'Grid', market: 'AVAX/USDT', status: 'error', runtimeSeconds: 43200, pnl: 96.42, roiPct: 0.8, winRate: 52.6, trades: 242 },
];
