export type MarketMeta = {
  symbol: string;
  pair: string;
  name: string;
  basePrice: number;
  change24h: number;
  volume24h: number;
};

export const MARKETS: MarketMeta[] = [
  { symbol: 'BTC', pair: 'BTC/USDT', name: 'Bitcoin', basePrice: 64230, change24h: 2.41, volume24h: 28_400_000_000 },
  { symbol: 'ETH', pair: 'ETH/USDT', name: 'Ethereum', basePrice: 3148.5, change24h: 1.87, volume24h: 14_120_000_000 },
  { symbol: 'SOL', pair: 'SOL/USDT', name: 'Solana', basePrice: 158.42, change24h: -1.24, volume24h: 4_820_000_000 },
  { symbol: 'ARB', pair: 'ARB/USDT', name: 'Arbitrum', basePrice: 1.184, change24h: 4.62, volume24h: 812_000_000 },
  { symbol: 'LINK', pair: 'LINK/USDT', name: 'Chainlink', basePrice: 17.86, change24h: -0.72, volume24h: 640_000_000 },
  { symbol: 'AVAX', pair: 'AVAX/USDT', name: 'Avalanche', basePrice: 36.21, change24h: 0.94, volume24h: 512_000_000 },
  { symbol: 'OP', pair: 'OP/USDT', name: 'Optimism', basePrice: 2.31, change24h: -2.18, volume24h: 288_000_000 },
  { symbol: 'DOT', pair: 'DOT/USDT', name: 'Polkadot', basePrice: 7.12, change24h: 1.12, volume24h: 244_000_000 },
];

export const LANDING_MARKETS = MARKETS.slice(0, 4);
