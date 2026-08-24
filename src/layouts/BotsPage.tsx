import { Bot as BotIcon, Plus } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { BotCard } from '../components/trading/BotCard';
import { Button } from '../components/ui/Button';
import { useBotsStore } from '../store/botsStore';

export function BotsPage() {
  const bots = useBotsStore((s) => s.bots);
  const toggle = useBotsStore((s) => s.toggle);
  const setStatus = useBotsStore((s) => s.setStatus);

  const running = bots.filter((b) => b.status === 'running').length;
  const totalPnl = bots.reduce((s, b) => s + b.pnl, 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Trading Bots</h2>
          <p className="num mt-0.5 text-xs text-content-muted">
            {running} running &middot; {bots.length - running} idle &middot; Aggregate PnL{' '}
            <span className={totalPnl >= 0 ? 'text-profit-bright' : 'text-loss-bright'}>
              {formatSigned(totalPnl)}
            </span>
          </p>
        </div>
        <Button variant="primary" size="md">
          <Plus size={14} /> New bot
        </Button>
      </div>

      <Panel title="Bot Fleet" subtitle="Start, pause, and configure automated strategies" bodyClassName="p-4">
        {bots.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-raised text-content-muted">
              <BotIcon size={18} />
            </div>
            <h3 className="text-sm font-semibold text-content">No bots configured</h3>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-content-muted">
              Deploy your first bot from a strategy template.
            </p>
            <Button variant="primary" size="sm" className="mt-4">
              Create your first bot
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {bots.map((bot) => (
              <BotCard key={bot.id} bot={bot} onToggle={toggle} onStop={(id) => setStatus(id, 'stopped')} />
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function formatSigned(value: number): string {
  const abs = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Math.abs(value));
  return `${value >= 0 ? '+' : '\u2212'}${abs}`;
}

export default BotsPage;
