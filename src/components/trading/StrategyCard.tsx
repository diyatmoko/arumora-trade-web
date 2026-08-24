import { useEffect, useRef, useState } from 'react';
import { Copy, Rocket, Archive, Pencil, FlaskConical, MoreHorizontal } from 'lucide-react';
import type { Strategy } from '../../data/strategies';
import { RISK_TONE } from '../../lib/chart-theme';
import { formatPct } from '../../lib/format';

export function StrategyCard({ strategy }: { strategy: Strategy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <article className="group flex flex-col rounded-xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-raised">
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-content">{strategy.name}</h3>
          <p className="num mt-1 text-[11px] text-content-muted">
            {strategy.market} &middot; {strategy.timeframe}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${RISK_TONE[strategy.risk] ?? ''}`}
          >
            {strategy.risk}
          </span>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label={`${strategy.name} actions`}
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-content-muted opacity-0 transition-all duration-150 hover:bg-surface-overlay hover:text-content focus-visible:opacity-100 group-hover:opacity-100"
            >
              <MoreHorizontal size={15} />
            </button>
            {menuOpen && (
              <ul
                role="menu"
                className="absolute right-0 top-8 z-20 w-40 overflow-hidden rounded-lg border border-line-strong bg-surface-overlay py-1 shadow-card th-modal-panel"
              >
                {[
                  { icon: Pencil, label: 'Edit' },
                  { icon: Copy, label: 'Duplicate' },
                  { icon: FlaskConical, label: 'Backtest' },
                  { icon: Rocket, label: 'Deploy' },
                  { icon: Archive, label: 'Archive' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} role="none">
                    <button
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-xs text-content-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-content"
                    >
                      <Icon size={13} /> {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-content-secondary">
        {strategy.tagline}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">Win rate</dt>
          <dd className="num mt-0.5 text-sm font-semibold text-profit-bright">{strategy.winRate}%</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">PF</dt>
          <dd className="num mt-0.5 text-sm font-semibold text-content">{strategy.profitFactor.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-content-muted">ROI</dt>
          <dd className="num mt-0.5 text-sm font-semibold text-accent">{formatPct(strategy.roiPct, 1)}</dd>
        </div>
      </dl>
    </article>
  );
}

export default StrategyCard;
