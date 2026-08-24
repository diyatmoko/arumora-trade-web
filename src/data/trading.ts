export type Side = 'LONG' | 'SHORT';

export type Position = {
  id: string;
  symbol: string;
  pair: string;
  side: Side;
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  roiPct: number;
  leverage: string;
  liquidationPrice: number;
  status: 'Open' | 'Closing';
};

export const POSITIONS: Position[] = [
  { id: 'pos-1', symbol: 'BTC', pair: 'BTC/USDT', side: 'LONG', size: 1.24, entryPrice: 61840.2, markPrice: 64230, pnl: 2963.55, roiPct: 3.86, leverage: '5x', liquidationPrice: 52180.4, status: 'Open' },
  { id: 'pos-2', symbol: 'ETH', pair: 'ETH/USDT', side: 'LONG', size: 18.6, entryPrice: 3012.8, markPrice: 3148.5, pnl: 2522.13, roiPct: 4.5, leverage: '3x', liquidationPrice: 2140.6, status: 'Open' },
  { id: 'pos-3', symbol: 'SOL', pair: 'SOL/USDT', side: 'SHORT', size: 240, entryPrice: 161.42, markPrice: 158.42, pnl: 720, roiPct: 1.86, leverage: '4x', liquidationPrice: 188.9, status: 'Open' },
  { id: 'pos-4', symbol: 'ARB', pair: 'ARB/USDT', side: 'LONG', size: 8200, entryPrice: 1.142, markPrice: 1.184, pnl: 344.4, roiPct: 3.68, leverage: '2x', liquidationPrice: 0.62, status: 'Open' },
  { id: 'pos-5', symbol: 'OP', pair: 'OP/USDT', side: 'SHORT', size: 3100, entryPrice: 2.248, markPrice: 2.31, pnl: -192.2, roiPct: -2.75, leverage: '3x', liquidationPrice: 2.94, status: 'Closing' },
];

export type Order = {
  id: string;
  time: string;
  symbol: string;
  pair: string;
  side: 'BUY' | 'SELL';
  type: 'Limit' | 'Market';
  size: string;
  price: number;
  filled: string;
  status: 'Filled' | 'Canceled' | 'Partial';
};

export const ORDER_HISTORY: Order[] = [
  { id: 'ord-91', time: '12:41:03', symbol: 'ETH', pair: 'ETH/USDT', side: 'SELL', type: 'Limit', size: '6.20 ETH', price: 3162.4, filled: '100%', status: 'Filled' },
  { id: 'ord-90', time: '11:58:47', symbol: 'BTC', pair: 'BTC/USDT', side: 'BUY', type: 'Limit', size: '0.35 BTC', price: 63810.0, filled: '100%', status: 'Filled' },
  { id: 'ord-89', time: '10:22:15', symbol: 'SOL', pair: 'SOL/USDT', side: 'SELL', type: 'Market', size: '80 SOL', price: 159.12, filled: '100%', status: 'Filled' },
  { id: 'ord-88', time: '09:47:02', symbol: 'ARB', pair: 'ARB/USDT', side: 'BUY', type: 'Limit', size: '4,000 ARB', price: 1.176, filled: '62%', status: 'Partial' },
  { id: 'ord-87', time: '08:31:56', symbol: 'LINK', pair: 'LINK/USDT', side: 'BUY', type: 'Limit', size: '500 LINK', price: 17.42, filled: '0%', status: 'Canceled' },
];

export type Transaction = {
  id: string;
  date: string;
  type: 'Deposit' | 'Withdrawal' | 'Fee' | 'Funding';
  asset: string;
  amount: number;
  usdValue: number;
  status: 'Completed' | 'Pending';
};

export const TRANSACTIONS: Transaction[] = [
  { id: 'tx-14', date: 'Aug 23, 2026 · 09:14', type: 'Deposit', asset: 'USDT', amount: 25000, usdValue: 25000, status: 'Completed' },
  { id: 'tx-13', date: 'Aug 21, 2026 · 17:42', type: 'Funding', asset: 'USDT', amount: -84.16, usdValue: -84.16, status: 'Completed' },
  { id: 'tx-12', date: 'Aug 19, 2026 · 11:05', type: 'Withdrawal', asset: 'USDC', amount: -5000, usdValue: -5000, status: 'Completed' },
  { id: 'tx-11', date: 'Aug 16, 2026 · 08:27', type: 'Fee', asset: 'USDT', amount: -212.48, usdValue: -212.48, status: 'Completed' },
  { id: 'tx-10', date: 'Aug 12, 2026 · 19:53', type: 'Deposit', asset: 'USDC', amount: 40000, usdValue: 40000, status: 'Completed' },
];

export type ActivityItem = {
  id: string;
  time: string;
  source: string;
  action: string;
  detail?: string;
  tone: 'profit' | 'loss' | 'info' | 'warn';
};

export const ACTIVITY: ActivityItem[] = [
  { id: 'act-1', time: '12:42:18', source: 'BTC Momentum Bot', action: 'Opened LONG position', detail: '0.42 BTC @ $64,118', tone: 'info' },
  { id: 'act-2', time: '12:41:03', source: 'ETH Mean Reversion', action: 'Closed position', detail: '+0.84% · +$126.40', tone: 'profit' },
  { id: 'act-3', time: '12:39:52', source: 'Risk Engine', action: 'Margin utilization increased', detail: '38% of available', tone: 'warn' },
  { id: 'act-4', time: '12:36:20', source: 'ARB Liquidation Hunter', action: 'Opened LONG position', detail: '4,000 ARB @ $1.181', tone: 'info' },
  { id: 'act-5', time: '12:31:44', source: 'SOL Scalper', action: 'Position closed by stop-loss', detail: '-0.32% · -$41.18', tone: 'loss' },
  { id: 'act-6', time: '12:28:07', source: 'Portfolio Engine', action: 'Daily rebalance completed', detail: '5 assets aligned to target weights', tone: 'info' },
  { id: 'act-7', time: '12:14:51', source: 'BTC Momentum Bot', action: 'Trailing stop adjusted', detail: '$63,480 → $64,002', tone: 'info' },
];
