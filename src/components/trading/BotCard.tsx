import { Pause, Play, Settings2, Square } from 'lucide-react';
import type { Bot } from '../../data/bots';
import { formatPct, formatRuntime, formatUSD } from '../../lib/format';
import { StatusPill } from '../ui/Badge';
import { WinRateRing } from '../charts/WinRateRing';
import { Modal } from '../ui/Modal';
import { useState } from 'react';

export function BotCard({
  bot,
  onToggle,
  onStop,
}: {
  bot: Bot;
  onToggle: (id: string) => void;
  onStop: (id: string) => void;
}) {
  const [configOpen, setConfigOpen] = useState(false);
  const running = bot.status === 'running';

  return (
    <article className="group rounded-xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-raised">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-content">{bot.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-content-muted">
            <span className="rounded border border-line bg-surface-overlay px-1.5 py-px">{bot.strategy}</span>
            <span className="num rounded border border-line bg-surface-overlay px-1.5 py-px">{bot.market}</span>
          </p>
        </div>
        <StatusPill status={bot.status} />
      </header>

      <div className="mt-4 flex items-center justify-between gap-4">
        <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          <div>
            <dt className="text-content-muted">PnL</dt>
            <dd
              className={`num mt-0.5 font-semibold ${
                bot.pnl >= 0 ? 'text-profit-bright' : 'text-loss-bright'
              }`}
            >
              {formatUSD(bot.pnl, { sign: true })}
            </dd>
          </div>
          <div>
            <dt className="text-content-muted">ROI</dt>
            <dd className={`num mt-0.5 font-semibold ${bot.roiPct >= 0 ? 'text-profit-bright' : 'text-loss-bright'}`}>
              {formatPct(bot.roiPct)}
            </dd>
          </div>
          <div>
            <dt className="text-content-muted">Trades</dt>
            <dd className="num mt-0.5 text-content-secondary">{bot.trades.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-content-muted">Runtime</dt>
            <dd className="num mt-0.5 text-content-secondary">
              {bot.status === 'stopped' ? '\u2014' : formatRuntime(bot.runtimeSeconds)}
            </dd>
          </div>
        </dl>
        <WinRateRing value={bot.winRate} />
      </div>

      <footer className="mt-4 flex items-center gap-2 border-t border-line pt-3" role="group" aria-label={`${bot.name} controls`}>
        <button
          onClick={() => onToggle(bot.id)}
          disabled={bot.status === 'error'}
          className={`inline-flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 ${
            running
              ? 'bg-warn-dim text-warn hover:bg-warn/20'
              : 'bg-profit-dim text-profit-bright hover:bg-profit/25'
          }`}
        >
          {running ? (
            <>
              <Pause size={13} /> Pause
            </>
          ) : (
            <>
              <Play size={13} /> Start
            </>
          )}
        </button>
        <button
          onClick={() => onStop(bot.id)}
          className="inline-flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg bg-surface-overlay text-content-muted transition-colors duration-200 hover:bg-loss-dim hover:text-loss-bright"
          aria-label={`Stop ${bot.name}`}
        >
          <Square size={12} />
        </button>
        <button
          onClick={() => setConfigOpen(true)}
          className="inline-flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg bg-surface-overlay text-content-muted transition-colors duration-200 hover:bg-surface-hover hover:text-content"
          aria-label={`Configure ${bot.name}`}
        >
          <Settings2 size={14} />
        </button>
      </footer>

      <Modal open={configOpen} onClose={() => setConfigOpen(false)} title={`Configure \u00b7 ${bot.name}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfigOpen(false);
          }}
          className="space-y-4"
        >
          <label className="block text-xs text-content-secondary">
            Max position size (USDT)
            <input
              type="number"
              defaultValue={5000}
              className="num mt-1 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content focus:border-accent-line focus:outline-none"
            />
          </label>
          <label className="block text-xs text-content-secondary">
            Leverage
            <input
              type="range"
              min={1}
              max={10}
              defaultValue={3}
              className="mt-2 w-full accent-cyan"
              aria-describedby="lev-hint"
            />
            <span id="lev-hint" className="num mt-1 block text-[10px] text-content-muted">
              Current: 3x
            </span>
          </label>
          <button
            type="submit"
            className="h-9 w-full cursor-pointer rounded-lg bg-accent text-sm font-semibold text-[#04121a] transition-colors duration-200 hover:bg-accent-strong"
          >
            Save configuration
          </button>
        </form>
      </Modal>
    </article>
  );
}

export default BotCard;
