import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { MarketList } from '../components/trading/MarketList';
import { MARKETS } from '../data/markets';
import { useMarketStore } from '../store/marketStore';
import { formatPct, formatUSD } from '../lib/format';

export function MarketsPage() {
  const [query, setQuery] = useState('');
  const quotes = useMarketStore((s) => s.quotes);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;
    return MARKETS.filter(
      (m) => m.symbol.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
    ).map((m) => m.symbol);
  }, [query]);

  const gainers = useMemo(
    () =>
      [...MARKETS]
        .sort((a, b) => (quotes[b.symbol]?.change24h ?? b.change24h) - (quotes[a.symbol]?.change24h ?? a.change24h))
        .slice(0, 3),
    [quotes],
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <section aria-label="Top movers" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {gainers.map((m) => {
          const change = quotes[m.symbol]?.change24h ?? m.change24h;
          const positive = change >= 0;
          return (
            <div key={m.symbol} className="rounded-xl border border-line bg-surface p-4 shadow-card transition-colors duration-200 hover:border-line-strong">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-content">{m.pair}</p>
                <span className={`num text-xs font-semibold ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
                  {formatPct(change)}
                </span>
              </div>
              <p className="num mt-2 text-xl font-semibold tracking-tight text-white">
                {formatUSD(quotes[m.symbol]?.price ?? m.basePrice)}
              </p>
            </div>
          );
        })}
      </section>

      <Panel
        title="All Markets"
        actions={
          <div className="relative">
            <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-content-faint" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter markets..."
              aria-label="Filter markets"
              className="h-8 w-40 rounded-lg border border-line bg-surface-raised pl-8 pr-2 text-xs text-content placeholder:text-content-faint focus:border-accent-line focus:outline-none sm:w-52"
            />
          </div>
        }
        bodyClassName=""
      >
        <MarketList symbols={filtered} showVolume />
        {filtered && filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-xs text-content-muted">No markets match &ldquo;{query}&rdquo;.</p>
        )}
      </Panel>
    </div>
  );
}

export default MarketsPage;
