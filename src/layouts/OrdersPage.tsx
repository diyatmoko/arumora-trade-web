import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import SegmentedControl from '../components/ui/SegmentedControl';
import { EmptyState } from '../components/ui/EmptyState';
import { StatusPill } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ORDER_HISTORY } from '../data/trading';
import { formatUSD } from '../lib/format';

type Tab = 'open' | 'history';

export function OrdersPage() {
  const [tab, setTab] = useState<Tab>('history');

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <Panel
        title="Orders"
        actions={
          <div className="flex items-center gap-2">
            <SegmentedControl
              options={[
                { label: 'Open', value: 'open' as Tab },
                { label: 'History', value: 'history' as Tab },
              ]}
              value={tab}
              onChange={setTab}
              ariaLabel="Orders view"
            />
            <Button variant="secondary" size="sm">
              New order
            </Button>
          </div>
        }
        bodyClassName=""
      >
        {tab === 'open' ? (
          <EmptyState
            icon={<ClipboardList size={18} />}
            title="No open orders"
            description="Limit and stop orders waiting for execution will appear here."
            action={
              <Button variant="primary" size="sm">
                Place an order
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead>
                <tr className="sticky top-0 border-b border-line bg-surface-raised text-[10px] uppercase tracking-wide text-content-muted">
                  <th scope="col" className="px-4 py-2.5 font-medium">Time</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Pair</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Side</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Type</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">Size</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">Price</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">Filled</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ORDER_HISTORY.map((o) => (
                  <tr key={o.id} className="transition-colors duration-150 hover:bg-surface-raised">
                    <td className="num px-4 py-2.5 text-content-faint">{o.time}</td>
                    <td className="px-3 py-2.5 font-semibold text-content">{o.pair}</td>
                    <td className="px-3 py-2.5">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${o.side === 'BUY' ? 'bg-profit-dim text-profit-bright' : 'bg-loss-dim text-loss-bright'}`}>
                        {o.side}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-content-secondary">{o.type}</td>
                    <td className="num px-3 py-2.5 text-right text-content-secondary">{o.size}</td>
                    <td className="num px-3 py-2.5 text-right text-content">{formatUSD(o.price)}</td>
                    <td className="num px-3 py-2.5 text-right text-content-secondary">{o.filled}</td>
                    <td className="px-4 py-2.5 text-right">
                      <StatusPill status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

export default OrdersPage;
