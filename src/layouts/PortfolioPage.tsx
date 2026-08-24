import { lazy, useMemo, Suspense, useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { Skeleton } from '../components/ui/Skeleton';
import { StatTile } from '../components/trading/StatTile';
import { ReturnBars } from '../components/charts/ReturnBars';
import SegmentedControl from '../components/ui/SegmentedControl';
import { Badge } from '../components/ui/Badge';
import { ALLOCATION, PERFORMANCE, PORTFOLIO_STATS } from '../data/portfolio';
import { equitySeries } from '../lib/series';
import { formatPct, formatUSD } from '../lib/format';

type Range = '1M' | '3M' | 'ALL';

const EquityCurve = lazy(() =>
  import('../components/charts/PriceChart').then((m) => ({ default: m.EquityCurve })),
);

const RANGE_OPTIONS = [
  { label: '1M', value: '1M' as Range },
  { label: '3M', value: '3M' as Range },
  { label: 'ALL', value: 'ALL' as Range },
];

export function PortfolioPage() {
  const [range, setRange] = useState<Range>('3M');

  const points = useMemo(() => {
    const all = equitySeries(180);
    if (range === '1M') return all.slice(-30);
    if (range === '3M') return all.slice(-90);
    return all;
  }, [range]);

  const rangeChangePct =
    ((points[points.length - 1].value - points[0].value) / points[0].value) * 100;

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <section aria-label="Balance overview" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatTile label="Total Balance" value={formatUSD(PORTFOLIO_STATS.totalBalance)} delta={PORTFOLIO_STATS.roiPct} deltaLabel="All time" />
        <StatTile label="Today's PnL" value={formatUSD(PORTFOLIO_STATS.todaysPnl, { sign: true })} />
        <StatTile label="Total PnL" value={formatUSD(PORTFOLIO_STATS.totalPnl, { sign: true })} />
        <StatTile label="ROI" value={formatPct(PORTFOLIO_STATS.roiPct)} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[2.2fr_1fr]" aria-label="Performance">
        <Panel
          title="Equity Curve"
          subtitle={`${range} \u00b7 ${formatPct(rangeChangePct)}`}
          actions={<SegmentedControl options={RANGE_OPTIONS} value={range} onChange={setRange} ariaLabel="Equity curve range" />}
          bodyClassName=""
        >
          <div className="px-2 py-3 sm:px-3">
            <Suspense fallback={<Skeleton className="h-[320px] w-full rounded-none" />}>
              <EquityCurve points={points} height={320} />
            </Suspense>
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
            {[
              { k: 'Realized PnL', v: formatUSD(PORTFOLIO_STATS.realizedPnl, { sign: true }) },
              { k: 'Unrealized PnL', v: formatUSD(PORTFOLIO_STATS.unrealizedPnl, { sign: true }) },
              { k: 'Available', v: formatUSD(PORTFOLIO_STATS.availableBalance) },
              { k: 'Margin Used', v: `${PORTFOLIO_STATS.marginUsedPct}%` },
            ].map((cell) => (
              <div key={cell.k} className="bg-surface px-4 py-2.5">
                <p className="text-[10px] uppercase tracking-wide text-content-muted">{cell.k}</p>
                <p className="num mt-0.5 text-sm font-semibold text-content">{cell.v}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Allocation" bodyClassName="p-4 space-y-3">
            {ALLOCATION.map((a) => (
              <div key={a.symbol} className="flex items-center gap-3 text-xs">
                <span className="w-16 shrink-0 font-medium text-content-secondary">{a.symbol}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className="h-full rounded-full bg-accent/70 transition-colors duration-200 hover:bg-accent"
                    style={{ width: `${a.weight}%` }}
                  />
                </div>
                <span className="num w-20 shrink-0 text-right text-content-muted">{formatUSD(a.value, { compact: true })}</span>
                <span className="num w-12 shrink-0 text-right text-content-secondary">{a.weight}%</span>
              </div>
            ))}
          </Panel>

          <Panel title="Key Metrics" bodyClassName="p-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              {[
                { k: 'Win Rate', v: `${PERFORMANCE.winRate}%` },
                { k: 'Profit Factor', v: PERFORMANCE.profitFactor.toFixed(2) },
                { k: 'Sharpe', v: PERFORMANCE.sharpe.toFixed(2) },
                { k: 'Max Drawdown', v: `${PERFORMANCE.maxDrawdown}%` },
                { k: 'Trades', v: PERFORMANCE.trades.toLocaleString() },
                { k: 'Avg Hold', v: `${PERFORMANCE.avgHoldHours}h` },
              ].map((m) => (
                <div key={m.k}>
                  <dt className="text-[10px] uppercase tracking-wide text-content-muted">{m.k}</dt>
                  <dd className="num mt-0.5 text-sm font-semibold text-content">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </section>

      <Panel
        title="Monthly Performance"
        subtitle="Return per month, net of fees"
        actions={<Badge tone="profit">8 of 12 months positive</Badge>}
        bodyClassName="p-4"
      >
        <ReturnBars />
      </Panel>
    </div>
  );
}

export default PortfolioPage;
