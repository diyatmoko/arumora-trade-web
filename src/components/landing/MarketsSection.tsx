import { useRef } from 'react';
import { Panel } from '../ui/Panel';
import { Sparkline } from '../charts/Sparkline';
import { LANDING_MARKETS, MARKETS } from '../../data/markets';
import { useMarketStore } from '../../store/marketStore';
import { formatCompact, formatPct, formatUSD } from '../../lib/format';
import { sparkPoints } from '../../lib/series';
import { useScrollReveal, useParallax } from '../../hooks/useScrollFx';
import { useDrawPath } from '../../hooks/useCountUp';

function MarketCard({ symbol }: { symbol: string }) {
  const meta = MARKETS.find((m) => m.symbol === symbol);
  const quote = useMarketStore((s) => s.quotes[symbol]);
  if (!meta) return null;
  const price = quote?.price ?? meta.basePrice;
  const change = quote?.change24h ?? meta.change24h;
  const positive = change >= 0;

  return (
    <div
      data-reveal
      className="group rounded-xl border border-line bg-surface p-4 shadow-card transition-colors duration-200 hover:border-line-strong hover:bg-surface-raised"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-surface-overlay text-[10px] font-bold text-content-secondary">
            {meta.symbol.slice(0, 3)}
          </span>
          <div>
            <p className="text-sm font-semibold text-content">{meta.pair}</p>
            <p className="text-[11px] text-content-muted">{meta.name}</p>
          </div>
        </div>
        <span className={`num rounded-md border px-1.5 py-0.5 text-xs font-semibold ${positive ? 'border-profit/25 bg-profit-dim text-profit-bright' : 'border-loss/25 bg-loss-dim text-loss-bright'}`}>
          {formatPct(change)}
        </span>
      </div>

      <p className="num mt-4 text-2xl font-semibold tracking-tight text-white">
        {formatUSD(price)}
      </p>

      <div className="mt-3 h-14">
        <Sparkline points={sparkPoints(symbol)} positive={positive} animated />
      </div>

      <dl className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px]">
        <dt className="text-content-muted">24h Volume</dt>
        <dd className="num text-content-secondary">${formatCompact(meta.volume24h)}</dd>
      </dl>
    </div>
  );
}

export function MarketsSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useScrollReveal(scopeRef, { stagger: 0.1 });
  useDrawPath(scopeRef, { scrub: true, start: 'top 90%', end: 'center 45%' });
  useParallax(scopeRef, '[data-parallax]', 40);

  return (
    <section id="markets" ref={scopeRef} className="relative py-24 sm:py-32" aria-label="Market intelligence">
      <div aria-hidden="true" data-parallax="0.6" className="absolute inset-0 bg-grid-faint opacity-60 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Market Intelligence</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every market. One terminal.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-content-secondary">
            Real-time prices, depth, and momentum across major assets &mdash; streamed into a single,
            keyboard-driven workspace.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_MARKETS.map((m) => (
            <MarketCard key={m.symbol} symbol={m.symbol} />
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-reveal>
          <Panel title="24h Movers" bodyClassName="">
            <ul className="divide-y divide-line">
              {MARKETS.slice(4, 8).map((m) => {
                const positive = m.change24h >= 0;
                return (
                  <li key={m.symbol} className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-surface-raised">
                    <span className="w-20 shrink-0 text-xs font-semibold text-content">{m.pair}</span>
                    <span className="hidden h-7 w-24 sm:block">
                      <Sparkline points={sparkPoints(m.symbol)} positive={positive} animated />
                    </span>
                    <span className={`num ml-auto w-16 text-right text-xs font-medium ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
                      {formatPct(m.change24h)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </section>
  );
}

export default MarketsSection;
