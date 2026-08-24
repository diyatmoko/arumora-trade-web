import { lazy, useMemo, Suspense, useState } from 'react';
import { Wallet, Activity, Layers, Percent } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Skeleton } from '../components/ui/Skeleton';
import { StatTile } from '../components/trading/StatTile';
import { MarketList } from '../components/trading/MarketList';
import { PositionsTable } from '../components/trading/PositionsTable';
import { ActivityFeed } from '../components/trading/ActivityFeed';
import { BotCard } from '../components/trading/BotCard';
import { Button, IconButton } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ACTIVITY } from '../data/trading';
import { PORTFOLIO_STATS } from '../data/portfolio';
import { MARKETS } from '../data/markets';
import { useBotsStore } from '../store/botsStore';
import { useMarketStore } from '../store/marketStore';
import { formatPct, formatUSD } from '../lib/format';
import { TIMEFRAMES, type Timeframe } from '../lib/series';

const TF_OPTIONS = TIMEFRAMES.map((tf) => ({ label: tf, value: tf }));

const PriceChart = lazy(() =>
  import('../components/charts/PriceChart').then((m) => ({ default: m.PriceChart })),
);

export function DashboardPage() {
  const [symbol, setSymbol] = useState('BTC');
  const [timeframe, setTimeframe] = useState<Timeframe>('1H');
  const bots = useBotsStore((s) => s.bots);
  const toggleBot = useBotsStore((s) => s.toggle);
  const stopBot = useBotsStore((s) => s.setStatus);
  const quotes = useMarketStore((s) => s.quotes);

  const meta = MARKETS.find((m) => m.symbol === symbol) ?? MARKETS[0];
  const quote = quotes[symbol];
  const change24h = quote?.change24h ?? meta.change24h;
  const runningBots = useMemo(() => bots.filter((b) => b.status === 'running').slice(0, 3), [bots]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-4">
      {/* Portfolio summary */}
      <section aria-label="Portfolio summary" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatTile
          label="Total Balance"
          value={formatUSD(PORTFOLIO_STATS.totalBalance)}
          delta={PORTFOLIO_STATS.roiPct}
          deltaLabel="All time"
          icon={<Wallet size={15} />}
        />
        <StatTile
          label="Today's PnL"
          value={formatUSD(PORTFOLIO_STATS.todaysPnl, { sign: true })}
          icon={<Activity size={15} />}
        />
        <StatTile
          label="Open Positions"
          value="5"
          icon={<Layers size={15} />}
        />
        <StatTile
          label="Margin Used"
          value={`${PORTFOLIO_STATS.marginUsedPct}%`}
          icon={<Percent size={15} />}
        />
      </section>

      {/* Chart + watchlist */}
      <section aria-label="Market overview" className="grid gap-4 xl:grid-cols-[2.2fr_1fr]">
        <Panel
          title={
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="text-sm font-bold tracking-tight text-white normal-case">
                {meta.pair}
              </h2>
              <span className="num text-sm font-semibold text-content">
                {formatUSD(quote?.price ?? meta.basePrice)}
              </span>
              <Badge tone={change24h >= 0 ? 'profit' : 'loss'}>
                {formatPct(change24h)} 24H
              </Badge>
            </div>
          }
          actions={
            <div className="flex items-center gap-2">
              <IconButton label="Fullscreen chart">
                <MaximizeIcon />
              </IconButton>
              <IconButton label="Chart indicators">
                <IndicatorsIcon />
              </IconButton>
            </div>
          }
          bodyClassName=""
        >
          <div className="flex items-center justify-between gap-2 overflow-x-auto border-b border-line px-3 py-2 scrollbar-hide">
            <ul className="flex items-center gap-1" role="tablist" aria-label="Timeframe">
              {TF_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    role="tab"
                    aria-selected={timeframe === opt.value}
                    onClick={() => setTimeframe(opt.value)}
                    className={`num cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors duration-150 ${
                      timeframe === opt.value
                        ? 'bg-surface-overlay text-content'
                        : 'text-content-muted hover:text-content-secondary'
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="hidden shrink-0 items-center gap-1 sm:flex">
              <Button variant="secondary" size="sm" className="pointer-events-none opacity-90">
                Indicators
              </Button>
            </div>
          </div>

          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-none" />}>
            <PriceChart symbol={symbol} timeframe={timeframe} basePrice={meta.basePrice} height={400} />
          </Suspense>

          <div className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
            {[
              { k: 'Entry', v: formatUSD(64210), tone: 'neutral' },
              { k: 'Mark', v: formatUSD(quote?.price ?? meta.basePrice), tone: 'neutral' },
              { k: '24h Change', v: formatPct(change24h), tone: change24h >= 0 ? 'profit' : 'loss' },
              { k: 'Volume', v: `$${(meta.volume24h / 1e9).toFixed(1)}B`, tone: 'neutral' },
            ].map((cell) => (
              <div key={cell.k} className="bg-surface px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-content-muted">{cell.k}</p>
                <p
                  className={`num mt-0.5 text-xs font-semibold ${
                    cell.tone === 'profit' ? 'text-profit-bright' : cell.tone === 'loss' ? 'text-loss-bright' : 'text-content'
                  }`}
                >
                  {cell.v}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Watchlist" bodyClassName="">
          <MarketList selected={symbol} onSelect={setSymbol} showVolume />
        </Panel>
      </section>

      {/* Positions + activity */}
      <section aria-label="Positions and activity" className="grid gap-4 xl:grid-cols-[2.2fr_1fr]">
        <Panel
          title="Positions"
          actions={<Button variant="ghost" size="sm">Manage</Button>}
          bodyClassName=""
        >
          <PositionsTable />
        </Panel>

        <Panel
          title="Activity"
          actions={
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-content-muted">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-profit opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-profit" />
              </span>
              Realtime
            </span>
          }
          bodyClassName=""
        >
          <ActivityFeed items={ACTIVITY.slice(0, 6)} />
        </Panel>
      </section>

      {/* Running bots strip */}
      <section aria-label="Running bots">
        <Panel
          title="Automation"
          subtitle={`${runningBots.length} bots running`}
          bodyClassName="p-4"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {runningBots.map((bot) => (
              <BotCard key={bot.id} bot={bot} onToggle={toggleBot} onStop={(id) => stopBot(id, 'stopped')} />
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function MaximizeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M8.5 1.5H12.5V5.5M12.5 1.5 8 6M5.5 12.5H1.5V8.5M1.5 12.5 6 8" />
    </svg>
  );
}

function IndicatorsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 9.5C3.5 9.5 3.5 4.5 5.5 4.5S7.5 9.5 9.5 9.5 11.5 4.5 12.5 4.5" />
    </svg>
  );
}

export default DashboardPage;
