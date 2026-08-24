import { Activity, Percent, Shield, Target } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { StatTile } from '../components/trading/StatTile';
import { ReturnBars } from '../components/charts/ReturnBars';
import { WinRateRing } from '../components/charts/WinRateRing';
import { Badge } from '../components/ui/Badge';
import { STRATEGIES } from '../data/strategies';
import { PERFORMANCE } from '../data/portfolio';
import { formatPct } from '../lib/format';

export function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <section aria-label="Performance metrics" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatTile label="Win Rate" value={`${PERFORMANCE.winRate}%`} icon={<Target size={15} />} />
        <StatTile label="Profit Factor" value={PERFORMANCE.profitFactor.toFixed(2)} icon={<Activity size={15} />} />
        <StatTile label="Sharpe Ratio" value={PERFORMANCE.sharpe.toFixed(2)} icon={<Percent size={15} />} />
        <StatTile label="Max Drawdown" value={`${PERFORMANCE.maxDrawdown}%`} icon={<Shield size={15} />} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]" aria-label="Returns and strategy performance">
        <Panel title="Monthly Returns" subtitle="Net of fees and funding" bodyClassName="p-4">
          <ReturnBars />
        </Panel>

        <div className="space-y-4">
          <Panel title="Execution Quality" bodyClassName="flex items-center justify-around p-5">
            {[
              { label: 'Win rate', value: PERFORMANCE.winRate },
              { label: 'Bot uptime', value: 99.2 },
              { label: 'Fill rate', value: 94.7 },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <WinRateRing value={r.value} size={64} />
                <p className="mt-1.5 text-[10px] uppercase tracking-wide text-content-muted">{r.label}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Strategy Contribution" bodyClassName="space-y-3 p-4">
            {STRATEGIES.map((s) => (
              <div key={s.id} className="flex items-center gap-3 text-xs">
                <span className="w-32 shrink-0 truncate font-medium text-content-secondary">{s.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className={`h-full rounded-full ${s.roiPct >= 0 ? 'bg-profit/70' : 'bg-loss/70'}`}
                    style={{ width: `${Math.min(100, (Math.abs(s.roiPct) / 45) * 100)}%` }}
                  />
                </div>
                <span className={`num w-14 shrink-0 text-right font-medium ${s.roiPct >= 0 ? 'text-profit-bright' : 'text-loss-bright'}`}>
                  {formatPct(s.roiPct, 1)}
                </span>
              </div>
            ))}
          </Panel>
        </div>
      </section>

      <Panel title="Risk Snapshot" bodyClassName="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {[
          { k: 'Margin Utilization', v: '38%', tone: '' },
          { k: 'Largest Position', v: '42.6% BTC', tone: '' },
          { k: 'Liquidation Buffer', v: '31.2%', tone: 'text-profit-bright' },
          { k: 'Daily VaR (95%)', v: '-3.8%', tone: 'text-warn' },
        ].map((cell) => (
          <div key={cell.k} className="bg-surface px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-wide text-content-muted">{cell.k}</p>
            <p className={`num mt-1 text-sm font-semibold ${cell.tone || 'text-content'}`}>{cell.v}</p>
          </div>
        ))}
        <div className="col-span-2 bg-surface px-4 py-3 sm:col-span-4">
          <Badge tone="info">All risk limits within configured thresholds</Badge>
        </div>
      </Panel>
    </div>
  );
}

export default AnalyticsPage;
