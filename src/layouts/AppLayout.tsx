import { Outlet, useLocation } from 'react-router-dom';
import ScrollManager from '../app/ScrollManager';
import { Sidebar } from '../components/navigation/Sidebar';
import { Topbar } from '../components/navigation/Topbar';
import { CommandPalette } from '../components/navigation/CommandPalette';
import { useUiStore } from '../store/uiStore';

const TITLES: Record<string, string> = {
  '/app': 'Overview',
  '/app/markets': 'Markets',
  '/app/positions': 'Positions',
  '/app/orders': 'Orders',
  '/app/transactions': 'Transactions',
  '/app/bots': 'Trading Bots',
  '/app/strategies': 'Strategies',
  '/app/portfolio': 'Portfolio',
  '/app/analytics': 'Analytics',
  '/app/settings': 'Settings',
};

function AppLayout() {
  const pathname = useLocation().pathname;
  const drawerOpen = useUiStore((s) => s.drawerOpen);

  return (
    <div className={`flex min-h-screen bg-bg text-content antialiased ${drawerOpen ? 'overflow-hidden' : ''}`}>
      <ScrollManager />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={TITLES[pathname]} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}

export default AppLayout;
