export type RiskLevel = 'Low' | 'Medium' | 'High';

export type Strategy = {
  id: string;
  name: string;
  tagline: string;
  market: string;
  timeframe: string;
  risk: RiskLevel;
  winRate: number;
  profitFactor: number;
  roiPct: number;
  deployed: boolean;
};

export const STRATEGIES: Strategy[] = [
  { id: 'stg-momentum', name: 'Momentum', tagline: 'Rides strong directional moves with volume confirmation and trailing exits.', market: 'BTC · ETH · SOL', timeframe: '4H', risk: 'Medium', winRate: 68.4, profitFactor: 2.41, roiPct: 31.2, deployed: true },
  { id: 'stg-meanrev', name: 'Mean Reversion', tagline: 'Fades stretched moves back to the mean using volatility bands.', market: 'ETH · LINK', timeframe: '1H', risk: 'Low', winRate: 72.1, profitFactor: 2.02, roiPct: 18.6, deployed: true },
  { id: 'stg-liq', name: 'Liquidation Sweep', tagline: 'Detects cascading liquidations and captures violent reversion snaps.', market: 'Perps · Alts', timeframe: '5m', risk: 'High', winRate: 58.7, profitFactor: 3.12, roiPct: 44.8, deployed: true },
  { id: 'stg-breakout', name: 'Breakout', tagline: 'Enters on range compression breakouts with fakeout filters.', market: 'SOL · ARB · OP', timeframe: '15m', risk: 'High', winRate: 54.2, profitFactor: 2.68, roiPct: 38.4, deployed: false },
];
