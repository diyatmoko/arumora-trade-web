import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Sparkline } from '../charts/Sparkline';
import { StatTile } from '../trading/StatTile';
import { PositionsTable } from '../trading/PositionsTable';
import { POSITIONS } from '../../data/trading';
import { MARKETS } from '../../data/markets';
import { useMarketStore } from '../../store/marketStore';
import { formatPct, formatUSD } from '../../lib/format';
import { sparkPoints } from '../../lib/series';
import { gsap } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';

function LiveTickerStrip() {
  const quotes = useMarketStore((s) => s.quotes);
  const symbols = ['BTC', 'ETH', 'SOL', 'ARB'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Live market prices">
      {symbols.map((sym) => {
        const meta = MARKETS.find((m) => m.symbol === sym);
        const quote = quotes[sym];
        if (!meta || !quote) return null;
        const positive = quote.change24h >= 0;
        return (
          <span key={sym} className="inline-flex items-center gap-2 text-xs">
            <span className="font-semibold text-content">{meta.pair}</span>
            <span className="num text-content-secondary">{formatUSD(quote.price)}</span>
            <span className={`num font-medium ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
              {formatPct(quote.change24h)}
            </span>
          </span>
        );
      })}
      <span className="inline-flex items-center gap-1.5 rounded-md border border-profit/25 bg-profit-dim px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-profit-bright">
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="absolute h-full w-full animate-ping rounded-full bg-profit opacity-60" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-profit" />
        </span>
        Live
      </span>
    </div>
  );
}

function DashboardPreview() {
  return (
    <Panel
      title="Portfolio Overview"
      actions={<span className="num text-[10px] text-content-muted">Simulated feed</span>}
      bodyClassName="p-4 space-y-4"
      aria-label="TradeHub dashboard preview"
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Total Balance" value="$124,582.42" delta={8.42} deltaLabel="24H" />
        <StatTile label="Today's PnL" value="+$2,842.14" />
        <StatTile label="Open PnL" value="+$7,288.14" />
        <StatTile label="Active Bots" value="3 Running" />
      </div>

      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-line bg-surface-raised p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-content">Equity Curve</p>
            <p className="num text-xs text-profit-bright">+17.42% all time</p>
          </div>
          <div className="h-28 sm:h-36">
            <Sparkline points={sparkPoints('equity-preview', 48)} positive strokeWidth={1.5} />
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface-raised p-3">
          <p className="mb-2 text-xs font-semibold text-content">Watchlist</p>
          <ul className="space-y-1.5">
            {MARKETS.slice(0, 4).map((m) => {
              const positive = m.change24h >= 0;
              return (
                <li key={m.symbol} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-content-secondary">{m.pair}</span>
                  <span className={`num ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
                    {formatPct(m.change24h)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-surface-raised">
        <PositionsTable positions={POSITIONS.slice(0, 3)} />
      </div>
    </Panel>
  );
}

export function Hero() {
  const scopeRef = useRef<HTMLElement>(null);

  useGsap(scopeRef, (scope, reducedMotion) => {
    if (reducedMotion) return;

    gsap.set('[data-hero]', { opacity: 0, y: 26 });
    gsap.set('[data-hero-preview]', { opacity: 0, y: 40, scale: 0.94 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('[data-hero]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
      .to('[data-hero-preview]', { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.45');

    gsap.to('[data-hero-preview]', {
      y: -70,
      scale: 0.965,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: 0.5 },
    });

    gsap.to('[data-hero-glow]', {
      y: -110,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  return (
    <section ref={scopeRef} className="relative overflow-hidden pb-16 pt-32 sm:pt-40" aria-label="Introduction">
      <div
        aria-hidden="true"
        data-hero-glow
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_35%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p
            data-hero
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-raised/70 px-3 py-1 text-xs text-content-secondary backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Institutional-grade trading intelligence
          </p>
          <h1 data-hero className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl">
            Trade Smarter.
            <br />
            <span className="text-gradient">See Everything.</span>
          </h1>
          <p data-hero className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-content-secondary sm:text-lg">
            TradeHub unifies your portfolio, markets, bots, and strategies into a single
            professional terminal &mdash; so every decision is informed, fast, and precise.
          </p>
          <div data-hero className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/app" tabIndex={-1}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Launch TradeHub <ArrowRight size={15} />
              </Button>
            </Link>
            <a href="#strategies" tabIndex={-1}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Play size={14} /> See how it works
              </Button>
            </a>
          </div>
          <div data-hero className="mt-10 w-full">
            <LiveTickerStrip />
          </div>
        </div>

        <div data-hero-preview className="mx-auto mt-14 max-w-5xl">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

export default Hero;
