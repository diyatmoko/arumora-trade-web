import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  LineChart,
  Layers,
  ClipboardList,
  ArrowLeftRight,
  Bot,
  GitBranch,
  PieChart,
  Activity,
  Settings,
  CornerDownLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { MARKETS } from '../../data/markets';

const IS_MAC =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

type CommandItem = {
  id: string;
  label: string;
  group: 'Pages' | 'Markets' | 'Automation';
  icon: LucideIcon;
  to: string;
  keywords: string;
};

const PAGES: CommandItem[] = [
  { id: 'nav-overview', label: 'Overview', group: 'Pages', icon: LayoutDashboard, to: '/app', keywords: 'dashboard home trading' },
  { id: 'nav-portfolio', label: 'Portfolio', group: 'Pages', icon: PieChart, to: '/app/portfolio', keywords: 'balance equity allocation' },
  { id: 'nav-analytics', label: 'Analytics', group: 'Pages', icon: Activity, to: '/app/analytics', keywords: 'performance sharpe drawdown' },
  { id: 'nav-settings', label: 'Settings', group: 'Pages', icon: Settings, to: '/app/settings', keywords: 'profile api keys preferences' },
];

const MARKET_ITEMS: CommandItem[] = MARKETS.map((m) => ({
  id: `mkt-${m.symbol}`,
  label: m.pair,
  group: 'Markets' as const,
  icon: LineChart,
  to: '/app/markets',
  keywords: `${m.name} ${m.symbol} price chart`,
}));

const TRADING: CommandItem[] = [
  { id: 'nav-positions', label: 'Positions', group: 'Pages' as const, icon: Layers, to: '/app/positions', keywords: 'open trades pnl liquidation' },
  { id: 'nav-orders', label: 'Orders', group: 'Pages' as const, icon: ClipboardList, to: '/app/orders', keywords: 'history limit market fills' },
  { id: 'nav-transactions', label: 'Transactions', group: 'Pages' as const, icon: ArrowLeftRight, to: '/app/transactions', keywords: 'deposits withdrawals fees funding' },
  { id: 'nav-bots', label: 'Trading Bots', group: 'Automation' as const, icon: Bot, to: '/app/bots', keywords: 'automation start pause stop' },
  { id: 'nav-strategies', label: 'Strategies', group: 'Automation' as const, icon: GitBranch, to: '/app/strategies', keywords: 'backtest deploy builder momentum' },
];

const ALL_ITEMS: CommandItem[] = [...PAGES, ...TRADING, ...MARKET_ITEMS];

const GROUP_ORDER: CommandItem['group'][] = ['Pages', 'Markets', 'Automation'];

export function CommandPalette() {
  const open = useUiStore((s) => s.paletteOpen);
  const setOpen = useUiStore((s) => s.setPaletteOpen);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevQuery, setPrevQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setActive(0);
    }
  }
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActive(0);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? ALL_ITEMS.filter(
          (item) =>
            item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q),
        )
      : ALL_ITEMS.filter((i) => i.group !== 'Markets' || MARKET_ITEMS.indexOf(i) < 4);

    return GROUP_ORDER.flatMap((group) => filtered.filter((item) => item.group === group));
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!useUiStore.getState().paletteOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const select = (item: CommandItem) => {
    setOpen(false);
    navigate(item.to);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length === 0 ? 0 : (i + 1) % results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length === 0 ? 0 : (i - 1 + results.length) % results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[active];
      if (item) select(item);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button
        data-close
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm th-modal-backdrop"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface-raised shadow-card th-modal-panel">
        <div className="flex items-center gap-2.5 border-b border-line px-4">
          <Search size={15} className="shrink-0 text-content-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages, markets, bots..."
            aria-label="Search TradeHub"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-results"
            className="h-12 w-full bg-transparent text-sm text-content placeholder:text-content-faint focus:outline-none"
          />
          <kbd className="num shrink-0 rounded border border-line-strong bg-surface px-1.5 py-0.5 text-[10px] text-content-muted">
            Esc
          </kbd>
        </div>

        <ul id="command-results" ref={listRef} role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-xs text-content-muted">
              No results for &ldquo;{query}&rdquo;
            </li>
          )}

          {results.map((item, index) => {
            const showGroup = index === 0 || results[index - 1].group !== item.group;
            const isActive = index === active;
            return (
              <li key={item.id} role="none">
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-content-faint first:pt-1">
                    {item.group}
                  </p>
                )}
                <button
                  role="option"
                  aria-selected={isActive}
                  data-index={index}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => select(item)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-100 ${
                    isActive ? 'bg-accent-soft text-accent' : 'text-content-secondary'
                  }`}
                >
                  <item.icon size={15} className="shrink-0 opacity-80" aria-hidden="true" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <CornerDownLeft size={13} className="shrink-0 opacity-60" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[10px] text-content-muted">
          <span className="flex items-center gap-1.5">
            <kbd className="num rounded border border-line-strong bg-surface px-1 py-px">&uarr;&darr;</kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="num rounded border border-line-strong bg-surface px-1 py-px">&crarr;</kbd> open
          </span>
          <span className="ml-auto">{IS_MAC ? '\u2318K' : 'Ctrl K'}</span>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

export default CommandPalette;
