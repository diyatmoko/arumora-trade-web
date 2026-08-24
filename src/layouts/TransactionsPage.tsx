import { ArrowDownToLine, ArrowUpFromLine, Receipt } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { StatusPill } from '../components/ui/Badge';
import { TRANSACTIONS } from '../data/trading';
import { formatUSD } from '../lib/format';

export function TransactionsPage() {
  const deposits = TRANSACTIONS.filter((t) => t.type === 'Deposit').reduce((s, t) => s + t.usdValue, 0);
  const withdrawals = Math.abs(TRANSACTIONS.filter((t) => t.type === 'Withdrawal').reduce((s, t) => s + t.usdValue, 0));
  const fees = Math.abs(
    TRANSACTIONS.filter((t) => t.type === 'Fee' || t.type === 'Funding').reduce((s, t) => s + t.usdValue, 0),
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <section aria-label="Cashflow summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { k: 'Deposits (90d)', v: formatUSD(deposits), icon: ArrowDownToLine, tone: 'text-profit-bright' },
          { k: 'Withdrawals (90d)', v: formatUSD(withdrawals), icon: ArrowUpFromLine, tone: 'text-content' },
          { k: 'Fees & Funding (90d)', v: formatUSD(fees), icon: Receipt, tone: 'text-warn' },
        ].map((cell) => (
          <div key={cell.k} className="rounded-xl border border-line bg-surface p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-content-muted">{cell.k}</p>
              <cell.icon size={15} className={cell.tone} aria-hidden="true" />
            </div>
            <p className={`num mt-2 text-xl font-semibold ${cell.tone}`}>{cell.v}</p>
          </div>
        ))}
      </section>

      <Panel title="Transaction History" bodyClassName="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-raised text-[10px] uppercase tracking-wide text-content-muted">
                <th scope="col" className="px-4 py-2.5 font-medium">Date</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Type</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Asset</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Amount</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Value</th>
                <th scope="col" className="px-4 py-2.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="transition-colors duration-150 hover:bg-surface-raised">
                  <td className="num px-4 py-2.5 text-content-secondary">{t.date}</td>
                  <td className="px-3 py-2.5 text-content">{t.type}</td>
                  <td className="px-3 py-2.5 font-semibold text-content-secondary">{t.asset}</td>
                  <td className={`num px-3 py-2.5 text-right font-medium ${t.amount >= 0 ? 'text-profit-bright' : 'text-loss-bright'}`}>
                    {formatUSD(t.amount, { sign: true })}
                  </td>
                  <td className="num px-3 py-2.5 text-right text-content-secondary">{formatUSD(t.usdValue)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <StatusPill status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export default TransactionsPage;
