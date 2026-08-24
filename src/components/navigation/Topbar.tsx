import { Link } from 'react-router-dom';
import { Bell, Menu, Search, Plus } from 'lucide-react';
import { ConnectionBadge } from './ConnectionBadge';
import { useUiStore } from '../../store/uiStore';

const IS_MAC =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

export function Topbar({ title }: { title?: string }) {
  const setDrawerOpen = useUiStore((s) => s.setDrawerOpen);
  const setPaletteOpen = useUiStore((s) => s.setPaletteOpen);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content md:hidden"
      >
        <Menu size={18} />
      </button>

      {title && (
        <h1 className="hidden text-sm font-semibold text-content lg:block">{title}</h1>
      )}

      <button
        onClick={() => setPaletteOpen(true)}
        aria-label="Search (Ctrl K)"
        aria-keyshortcuts={IS_MAC ? 'Meta+K' : 'Control+K'}
        className="ml-auto hidden h-9 w-56 cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface-raised px-3 text-xs text-content-faint transition-colors duration-150 hover:border-line-strong hover:text-content-muted lg:ml-8 lg:flex lg:w-72"
      >
        <Search size={14} aria-hidden="true" />
        <span className="flex-1 text-left">Search markets, bots, orders...</span>
        <kbd className="num pointer-events-none rounded border border-line-strong bg-surface px-1.5 py-0.5 text-[10px] text-content-muted">
          {IS_MAC ? '\u2318K' : 'Ctrl K'}
        </kbd>
      </button>

      <button
        onClick={() => setPaletteOpen(true)}
        aria-label="Search"
        className="ml-auto inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-content-muted transition-colors hover:bg-surface-overlay hover:text-content sm:ml-0 lg:hidden"
      >
        <Search size={16} />
      </button>

      <div className="flex items-center gap-2">
        <ConnectionBadge />
        <Link
          to="/app/strategies"
          aria-label="Create strategy"
          className="hidden h-8 cursor-pointer items-center gap-1 rounded-lg bg-accent px-2.5 text-xs font-semibold text-[#04121a] transition-colors hover:bg-accent-strong sm:inline-flex"
        >
          <Plus size={13} /> New
        </Link>
        <button
          aria-label="Notifications"
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-content-muted transition-colors hover:bg-surface-overlay hover:text-content"
        >
          <Bell size={15} />
        </button>
        <button
          aria-label="Account menu"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-accent-line bg-accent-soft text-[10px] font-bold text-accent transition-transform duration-150 hover:brightness-125"
        >
          AT
        </button>
      </div>
    </header>
  );
}

export default Topbar;
