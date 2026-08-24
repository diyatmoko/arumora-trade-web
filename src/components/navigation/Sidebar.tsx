import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
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
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react';
import { Logo } from './Logo';
import { useUiStore } from '../../store/uiStore';

type NavItem = { label: string; to: string; icon: typeof LayoutDashboard; end?: boolean };
type NavGroup = { title?: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    items: [
      { label: 'Overview', to: '/app', icon: LayoutDashboard, end: true },
      { label: 'Markets', to: '/app/markets', icon: LineChart },
    ],
  },
  {
    title: 'Trading',
    items: [
      { label: 'Positions', to: '/app/positions', icon: Layers },
      { label: 'Orders', to: '/app/orders', icon: ClipboardList },
      { label: 'Transactions', to: '/app/transactions', icon: ArrowLeftRight },
    ],
  },
  {
    title: 'Automation',
    items: [
      { label: 'Trading Bots', to: '/app/bots', icon: Bot },
      { label: 'Strategies', to: '/app/strategies', icon: GitBranch },
    ],
  },
  {
    title: '',
    items: [
      { label: 'Portfolio', to: '/app/portfolio', icon: PieChart },
      { label: 'Analytics', to: '/app/analytics', icon: Activity },
      { label: 'Settings', to: '/app/settings', icon: Settings },
    ],
  },
];

function NavLinkRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `group/link relative flex h-9 cursor-pointer items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors duration-150 ${
          isActive
            ? 'bg-accent-soft text-accent'
            : 'text-content-secondary hover:bg-surface-overlay hover:text-content'
        } ${collapsed ? 'justify-center px-0' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent"
            />
          )}
          <item.icon size={16} className="shrink-0" aria-hidden="true" />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {collapsed && (
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full z-50 ml-2 hidden whitespace-nowrap rounded-md border border-line-strong bg-surface-overlay px-2 py-1 text-xs text-content shadow-card group-hover/link:block"
            >
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <div className={`flex h-14 shrink-0 items-center border-b border-line ${collapsed ? 'justify-center' : 'px-4'}`}>
        {collapsed ? (
          <Logo compact />
        ) : (
          <Logo />
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto overflow-x-hidden p-3" aria-label="Application">
        {NAV.map((group, gi) => (
          <ul key={gi} className="space-y-0.5">
            {group.title && !collapsed && (
              <li className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-content-faint">
                {group.title}
              </li>
            )}
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLinkRow item={item} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggle = useUiStore((s) => s.toggleSidebar);
  const drawerOpen = useUiStore((s) => s.drawerOpen);
  const setDrawerOpen = useUiStore((s) => s.setDrawerOpen);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`relative hidden shrink-0 flex-col border-r border-line bg-bg-soft transition-[width] duration-300 ease-out md:flex ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-16 z-10 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface-raised text-content-muted transition-colors duration-150 hover:text-accent"
        >
          {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
        </button>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm th-modal-backdrop"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-line-strong bg-bg-soft th-drawer" role="dialog" aria-label="Navigation drawer">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 z-10 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-content-muted hover:bg-surface-overlay hover:text-content"
            >
              <X size={16} />
            </button>
            <SidebarContent collapsed={false} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
