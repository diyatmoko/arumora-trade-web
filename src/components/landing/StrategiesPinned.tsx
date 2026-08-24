import { useRef } from 'react';
import { Badge } from '../ui/Badge';
import { STRATEGIES } from '../../data/strategies';
import { RISK_TONE } from '../../lib/chart-theme';
import { formatPct } from '../../lib/format';
import { gsap } from '../../lib/gsap';
import { useGsap, usePrefersReducedMotion } from '../../hooks/useGsap';

export function StrategiesPinned() {
  const scopeRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGsap(scopeRef, (scope, reducedMotion) => {
    if (reducedMotion) return;

    const panels = scope.querySelectorAll<HTMLElement>('[data-panel]');
    const railFill = scope.querySelector<HTMLElement>('[data-rail-fill]');
    const labels = scope.querySelectorAll<HTMLElement>('[data-step-label]');
    if (panels.length === 0) return;

    panels.forEach((p, i) => {
      if (i === 0) return;
      gsap.set(p, { autoAlpha: 0, y: 48 });
    });
    if (railFill) gsap.set(railFill, { scaleY: 0, transformOrigin: 'top center' });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: '[data-pin-stage]',
        start: 'top top',
        end: '+=2600',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    const segment = 1 / panels.length;
    panels.forEach((panel, i) => {
      const at = i * segment;
      if (i > 0) {
        tl.to(panels[i - 1], { autoAlpha: 0, y: -44, duration: segment * 0.3 }, at)
          .to(panel, { autoAlpha: 1, y: 0, duration: segment * 0.4 }, at + segment * 0.25);
      }
      labels.forEach((label, li) => {
        tl.to(label, { opacity: li === i ? 1 : 0.25, duration: 0.2 }, at + 0.02);
      });
    });

    if (railFill) {
      tl.to(railFill, { scaleY: 1, duration: 1, ease: 'none' }, 0);
    }
  }, []);

  const strategyPanel = (s: (typeof STRATEGIES)[number]) => (
    <div className="flex h-full flex-col rounded-2xl border border-line-strong bg-surface p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="num text-xs font-bold tracking-widest text-accent">
          {String(STRATEGIES.indexOf(s) + 1).padStart(2, '0')}
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white">{s.name}</h3>
        <span className={`ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold ${RISK_TONE[s.risk] ?? ''}`}>
          {s.risk} risk
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-content-secondary sm:text-base">{s.tagline}</p>

      <dl className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">Win rate</dt>
          <dd className="num mt-1 text-xl font-semibold text-profit-bright">{s.winRate}%</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">Profit factor</dt>
          <dd className="num mt-1 text-xl font-semibold text-content">{s.profitFactor.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">ROI</dt>
          <dd className="num mt-1 text-xl font-semibold text-accent">{formatPct(s.roiPct, 1)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center gap-2 pt-8">
        <Badge tone={s.deployed ? 'profit' : 'neutral'}>{s.deployed ? 'Deployed' : 'Draft'}</Badge>
        <span className="num text-[11px] text-content-muted">
          {s.market} &middot; {s.timeframe}
        </span>
      </div>
    </div>
  );

  return (
    <section id="strategies" ref={scopeRef} className="relative" aria-label="Trading strategies">
      <div data-pin-stage className={`relative ${reduced ? '' : 'flex h-screen items-center overflow-hidden'}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[120px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
          <div className={`gap-12 lg:grid lg:grid-cols-[1fr_1.15fr] ${reduced ? '' : ''}`}>
            <div className="mb-10 lg:mb-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Strategy Engine</p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trading intelligence, engineered.
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-content-secondary">
                Compose, backtest, and deploy strategies with institutional rigor &mdash; from
                momentum to liquidation sweeps.
              </p>

              <ol className="mt-10 hidden space-y-3 lg:block" aria-hidden="true">
                {STRATEGIES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      tabIndex={-1}
                      data-step-label
                      className="flex cursor-default items-center gap-3 text-left text-sm font-medium text-content transition-opacity duration-300"
                      style={{ opacity: s === STRATEGIES[0] ? 1 : 0.25 }}
                    >
                      <span className="num text-[10px] tracking-widest text-content-faint">
                        {String(STRATEGIES.indexOf(s) + 1).padStart(2, '0')}
                      </span>
                      {s.name}
                    </button>
                  </li>
                ))}
              </ol>

              {!reduced && (
                <div className="mt-10 hidden h-1 w-40 overflow-hidden rounded-full bg-surface-overlay lg:block" aria-hidden="true">
                  <div data-rail-fill className="h-full w-full bg-accent" />
                </div>
              )}
            </div>

            <div className={reduced ? 'space-y-4' : 'relative min-h-[420px]'}>
              {STRATEGIES.map((s) =>
                reduced ? (
                  <div key={s.id}>{strategyPanel(s)}</div>
                ) : (
                  <div key={s.id} data-panel className="absolute inset-0">
                    {strategyPanel(s)}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StrategiesPinned;
