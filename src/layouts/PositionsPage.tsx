import { useMemo, useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { PositionsTable } from '../components/trading/PositionsTable';
import SegmentedControl from '../components/ui/SegmentedControl';
import { POSITIONS, type Side } from '../data/trading';
import { formatPct, formatUSD } from '../lib/format';

type Filter = 'all' | 'long' | 'short';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' as Filter },
  { label: 'Long', value: 'long' as Filter },
  { label: 'Short', value: 'short' as Filter },
];

export function PositionsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const positions = useMemo(
    () => (filter === 'all' ? POSITIONS : POSITIONS.filter((p) => p.side === (filter.toUpperCase() as Side))),
    [filter],
  );

  const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const totalSize = positions.reduce((sum, p) => sum + p.size * p.markPrice * 0.01, 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <section aria-label="Positions summary" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: 'Open Positions', v: String(positions.length) },
          {
            k: 'Total PnL',
            v: formatUSD(totalPnl, { sign: true }),
            tone: totalPnl >= 0 ? 'text-profit-bright' : 'text-loss-bright',
          },
          { k: 'Notional', v: formatUSD(totalSize * 100) },
          { k: 'Margin Used', v: '38%' },
        ].map((cell) => (
          <div key={cell.k} className="rounded-xl border border-line bg-surface p-4 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wide text-content-muted">{cell.k}</p>
            <p className={`num mt-1.5 text-xl font-semibold ${cell.tone ?? 'text-white'}`}>{cell.v}</p>
          </div>
        ))}
      </section>

      <Panel
        title="Open Positions"
        actions={<SegmentedControl options={FILTER_OPTIONS} value={filter} onChange={setFilter} ariaLabel="Filter by side" />}
        bodyClassName=""
      >
        <PositionsTable positions={positions} />
        <p className="num border-t border-line px-4 py-2.5 text-right text-[11px] text-content-muted">
          Unrealized ROI across selection:{' '}
          <span className={totalPnl >= 0 ? 'text-profit-bright' : 'text-loss-bright'}>
            {formatPct((totalPnl / Math.max(1, totalSize)) * 100)}
          </span>
        </p>
      </Panel>
    </div>
  );
}

export default PositionsPage;
