import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { POSITIONS, type Position } from '../../data/trading';
import { formatPct, formatUSD } from '../../lib/format';
import { StatusPill } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

function PnLCell({ value, roi }: { value: number; roi: number }) {
  const positive = value >= 0;
  return (
    <div className={`num text-right ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
      <p className="font-medium">{formatUSD(value, { sign: true })}</p>
      <p className="text-[10px] opacity-80">{formatPct(roi)}</p>
    </div>
  );
}

function DesktopTable({ rows }: { rows: Position[] }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[860px] text-left text-xs">
        <thead>
          <tr className="sticky top-0 z-10 border-b border-line bg-surface-raised text-[10px] uppercase tracking-wide text-content-muted">
            <th scope="col" className="px-4 py-2.5 font-medium">Symbol</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Side</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Size</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Entry</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Mark</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">PnL / ROI</th>
            <th scope="col" className="px-3 py-2.5 text-center font-medium">Lev.</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Liq. Price</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((p) => (
            <tr key={p.id} className="transition-colors duration-150 hover:bg-surface-raised">
              <td className="px-4 py-2.5 font-semibold text-content">{p.pair}</td>
              <td className="px-3 py-2.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    p.side === 'LONG' ? 'bg-profit-dim text-profit-bright' : 'bg-loss-dim text-loss-bright'
                  }`}
                >
                  {p.side}
                </span>
              </td>
              <td className="num px-3 py-2.5 text-right text-content-secondary">{p.size.toLocaleString()}</td>
              <td className="num px-3 py-2.5 text-right text-content-secondary">{formatUSD(p.entryPrice)}</td>
              <td className="num px-3 py-2.5 text-right text-content">{formatUSD(p.markPrice)}</td>
              <td className="px-3 py-2.5">
                <PnLCell value={p.pnl} roi={p.roiPct} />
              </td>
              <td className="num px-3 py-2.5 text-center text-content-secondary">{p.leverage}</td>
              <td className="num px-3 py-2.5 text-right text-loss-bright/70">{formatUSD(p.liquidationPrice)}</td>
              <td className="px-4 py-2.5 text-right">
                <StatusPill status={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards({ rows }: { rows: Position[] }) {
  return (
    <ul className="divide-y divide-line md:hidden">
      {rows.map((p) => (
        <li key={p.id} className="px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  p.side === 'LONG' ? 'bg-profit-dim text-profit-bright' : 'bg-loss-dim text-loss-bright'
                }`}
              >
                {p.side}
              </span>
              <span className="text-xs font-semibold text-content">{p.pair}</span>
              <span className="num text-[10px] text-content-muted">{p.leverage}</span>
            </div>
            <StatusPill status={p.status} />
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <dt className="text-content-muted">Size</dt>
              <dd className="num mt-0.5 text-content-secondary">{p.size.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-content-muted">Entry / Mark</dt>
              <dd className="num mt-0.5 text-content-secondary">
                {formatUSD(p.entryPrice)} / {formatUSD(p.markPrice)}
              </dd>
            </div>
            <div className="text-right">
              <dt className="text-content-muted">PnL</dt>
              <dd className="mt-0.5">
                <PnLCell value={p.pnl} roi={p.roiPct} />
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function PositionsTable({ positions = POSITIONS }: { positions?: Position[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? positions : positions.slice(0, 5);

  if (positions.length === 0) {
    return (
      <EmptyState
        title="No active positions"
        description="Your open positions will appear here once a trade is executed."
      />
    );
  }

  return (
    <div>
      <DesktopTable rows={visible} />
      <MobileCards rows={visible} />
      {positions.length > 5 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-center gap-1 border-t border-line py-2.5 text-xs font-medium text-content-muted transition-colors duration-150 hover:bg-surface-raised hover:text-content"
        >
          {expanded ? (
            <>
              Show less <ChevronUp size={13} />
            </>
          ) : (
            <>
              Show all {positions.length} positions <ChevronDown size={13} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default PositionsTable;
