import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { StrategyCard } from '../components/trading/StrategyCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { STRATEGIES } from '../data/strategies';
import { formatPct } from '../lib/format';

export function StrategiesPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Strategies</h2>
          <p className="mt-0.5 text-xs text-content-muted">
            {STRATEGIES.filter((s) => s.deployed).length} deployed &middot; avg win rate{' '}
            <span className="num text-profit-bright">
              {formatPct(STRATEGIES.reduce((s, x) => s + x.winRate, 0) / STRATEGIES.length, 1)}
            </span>
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => setCreateOpen(true)}>
          <Plus size={14} /> Create strategy
        </Button>
      </div>

      <Panel title="Strategy Library" subtitle="Backtested and production-ready templates" bodyClassName="p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STRATEGIES.map((s) => (
            <StrategyCard key={s.id} strategy={s} />
          ))}
        </div>
      </Panel>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New strategy">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCreateOpen(false);
          }}
          className="space-y-4"
        >
          <label className="block text-xs text-content-secondary">
            Name
            <input
              type="text"
              required
              placeholder="e.g. BTC Momentum v2"
              className="mt-1 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content placeholder:text-content-faint focus:border-accent-line focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-content-secondary">
              Market
              <select
                defaultValue="BTC"
                className="mt-1 w-full cursor-pointer rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content focus:border-accent-line focus:outline-none"
              >
                {['BTC', 'ETH', 'SOL', 'ARB', 'LINK'].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-content-secondary">
              Timeframe
              <select
                defaultValue="1H"
                className="mt-1 w-full cursor-pointer rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content focus:border-accent-line focus:outline-none"
              >
                {['5m', '15m', '1H', '4H', '1D'].map((tf) => (
                  <option key={tf}>{tf}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="rounded-lg border border-line bg-surface p-3">
            <legend className="px-1 text-[10px] uppercase tracking-wide text-content-muted">Risk level</legend>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((r, i) => (
                <label key={r} className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-line py-1.5 text-xs text-content-secondary transition-colors hover:border-accent-line hover:text-accent">
                  <input type="radio" name="risk" defaultChecked={i === 1} className="accent-cyan" />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="h-9 w-full cursor-pointer rounded-lg bg-accent text-sm font-semibold text-[#04121a] transition-colors duration-200 hover:bg-accent-strong"
          >
            Save & backtest
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default StrategiesPage;
