import { useMemo } from 'react';
import { Sparkline } from '../charts/Sparkline';
import { useMarketStore } from '../../store/marketStore';
import { MARKETS } from '../../data/markets';
import { sparkPoints } from '../../lib/series';
import { formatPct, formatUSD } from '../../lib/format';

export function MarketList({
  symbols,
  selected,
  onSelect,
  showVolume = false,
}: {
  symbols?: string[];
  selected?: string;
  onSelect?: (symbol: string) => void;
  showVolume?: boolean;
}) {
  const quotes = useMarketStore((s) => s.quotes);
  const list = useMemo(
    () => MARKETS.filter((m) => !symbols || symbols.includes(m.symbol)),
    [symbols],
  );

  return (
    <ul className="divide-y divide-line">
      {list.map((m) => {
        const quote = quotes[m.symbol];
        const price = quote?.price ?? m.basePrice;
        const change = quote?.change24h ?? m.change24h;
        const positive = change >= 0;
        const active = selected === m.symbol;

        return (
          <li key={m.symbol}>
            <button
              onClick={() => onSelect?.(m.symbol)}
              aria-pressed={active}
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 hover:bg-surface-raised ${
                active ? 'bg-accent-soft' : ''
              }`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-overlay text-[9px] font-bold text-content-secondary">
                {m.symbol.slice(0, 3)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-content">{m.pair}</p>
                <p className="truncate text-[10px] text-content-muted">{m.name}</p>
              </div>
              <div className="hidden h-8 w-20 sm:block" data-market-spark>
                <Sparkline points={sparkPoints(m.symbol)} positive={positive} />
              </div>
              <div className="w-24 shrink-0 text-right">
                <p className="num text-xs font-medium text-content">
                  {formatUSD(price)}
                </p>
                <p className={`num text-[10px] ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
                  {formatPct(change)}
                </p>
              </div>
              {showVolume && (
                <p className="num hidden w-16 shrink-0 text-right text-[10px] text-content-muted lg:block">
                  ${(m.volume24h / 1e9).toFixed(1)}B
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default MarketList;
