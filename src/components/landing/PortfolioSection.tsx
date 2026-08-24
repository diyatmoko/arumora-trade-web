import { useMemo, useRef } from 'react';
import { Badge } from '../ui/Badge';
import { equitySeries } from '../../lib/series';
import { formatUSD } from '../../lib/format';
import { gsap } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import { PORTFOLIO_STATS, ALLOCATION } from '../../data/portfolio';

const W = 640;
const H = 240;

export function PortfolioSection() {
  const scopeRef = useRef<HTMLElement>(null);

  const { linePath, areaPath } = useMemo(() => {
    const pts = equitySeries(90);
    const values = pts.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const stepX = W / (pts.length - 1);
    const coords = pts.map((p, i) => [
      Number((i * stepX).toFixed(2)),
      Number((H - 12 - ((p.value - min) / span) * (H - 24)).toFixed(2)),
    ] as const);
    const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
    return { linePath: line, areaPath: `${line} L${W},${H} L0,${H} Z` };
  }, []);

  useGsap(scopeRef, (scope, reducedMotion) => {
    const card = scope.querySelector<HTMLElement>('[data-portfolio-card]');
    const counter = scope.querySelector<HTMLElement>('[data-count-value]');
    const path = scope.querySelector<SVGPathElement>('[data-equity-line]');
    const area = scope.querySelector<HTMLElement>('[data-equity-area]');
    const metrics = scope.querySelectorAll<HTMLElement>('[data-reveal-metric]');
    const alloc = scope.querySelectorAll<HTMLElement>('[data-reveal-alloc]');

    if (reducedMotion) {
      if (card) gsap.set(card, { opacity: 1 });
      if (counter) counter.textContent = formatUSD(PORTFOLIO_STATS.totalBalance);
      if (path) path.style.strokeDasharray = 'none';
      if (area) gsap.set(area, { opacity: 1 });
      gsap.set([...metrics, ...alloc], { opacity: 1 });
      return;
    }

    const len = path ? path.getTotalLength() : 0;
    if (path) {
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    }
    gsap.set(card, { opacity: 0, y: 44 });
    gsap.set(area, { opacity: 0 });
    gsap.set(metrics, { opacity: 0, y: 18 });
    gsap.set(alloc, { scaleX: 0, transformOrigin: 'left center' });

    const state = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: scope,
        start: 'top 80%',
        end: 'center 42%',
        scrub: 0.5,
      },
    });

    tl.to(card, { opacity: 1, y: 0, duration: 0.3 }, 0)
      .to(state, {
        v: PORTFOLIO_STATS.totalBalance,
        duration: 0.4,
        onUpdate: () => {
          if (counter) counter.textContent = formatUSD(state.v);
        },
      }, 0.25)
      .to(path, { strokeDashoffset: 0, duration: 0.5, ease: 'none' }, 0.35)
      .to(area, { opacity: 1, duration: 0.25 }, 0.7)
      .to(metrics, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }, 0.65)
      .to(alloc, { scaleX: 1, duration: 0.3, stagger: 0.06 }, 0.75);
  }, []);

  return (
    <section id="portfolio" ref={scopeRef} className="relative py-24 sm:py-32" aria-label="Portfolio intelligence">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-info/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Portfolio Intelligence</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your capital, decoded.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-content-secondary">
            Equity, allocation, and performance &mdash; reconciled across every account and bot in real time.
          </p>
        </div>

        <div
          data-portfolio-card
          className="mx-auto max-w-4xl rounded-2xl border border-line bg-surface shadow-card"
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-content-muted">Portfolio Value</p>
              <p className="num mt-1 text-3xl font-semibold tracking-tight text-white" data-count-value>
                $0.00
              </p>
              <p className="num mt-1 text-sm font-medium text-profit-bright">
                +{PORTFOLIO_STATS.roiPct}% all time
              </p>
            </div>
            <Badge tone="profit">24H Performance +8.42%</Badge>
          </header>

          <div className="px-2 pb-2 pt-4 sm:px-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-48 w-full sm:h-56" preserveAspectRatio="none" role="img" aria-label="Equity curve">
              <defs>
                <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(148,163,184,0.07)" strokeWidth="1" />
              ))}
              <path d={areaPath} fill="url(#equity-fill)" data-equity-area />
              <path
                d={linePath}
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                data-equity-line
              />
            </svg>
          </div>

          <div className="grid gap-3 border-t border-line px-5 py-4 sm:grid-cols-4 sm:px-6">
            {[
              { label: "Today's PnL", value: formatUSD(PORTFOLIO_STATS.todaysPnl, { sign: true }) },
              { label: 'Total PnL', value: formatUSD(PORTFOLIO_STATS.totalPnl, { sign: true }) },
              { label: 'Realized', value: formatUSD(PORTFOLIO_STATS.realizedPnl, { sign: true }) },
              { label: 'Unrealized', value: formatUSD(PORTFOLIO_STATS.unrealizedPnl, { sign: true }) },
            ].map((m) => (
              <div key={m.label} data-reveal-metric className="rounded-lg border border-line bg-surface-raised px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wide text-content-muted">{m.label}</p>
                <p className="num mt-0.5 text-sm font-semibold text-profit-bright">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-line px-5 py-4 sm:px-6" aria-label="Asset allocation">
            {ALLOCATION.map((a) => (
              <div key={a.symbol} className="flex items-center gap-3 text-xs">
                <span className="w-16 shrink-0 font-medium text-content-secondary">{a.symbol}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    data-reveal-alloc
                    className="h-full rounded-full bg-accent/70 transition-colors duration-200 hover:bg-accent"
                    style={{ width: `${a.weight}%` }}
                  />
                </div>
                <span className="num w-12 shrink-0 text-right text-content-muted">{a.weight}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
