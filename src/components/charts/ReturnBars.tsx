import { monthlyReturns } from '../../lib/series';

export function ReturnBars({ data = monthlyReturns() }: { data?: { month: string; value: number }[] }) {
  const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)));

  return (
    <div className="flex h-full min-h-32 items-end gap-2" role="img" aria-label="Monthly returns">
      {data.map((d) => {
        const pct = (Math.abs(d.value) / maxAbs) * 100;
        const positive = d.value >= 0;
        return (
          <div key={d.month} className="group flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <span className={`num text-[10px] ${positive ? 'text-profit-bright' : 'text-loss-bright'}`}>
              {d.value > 0 ? '+' : ''}
              {d.value}%
            </span>
            <div className="flex h-20 w-full max-w-7 items-end justify-center">
              <div
                className={`w-full rounded-t-sm transition-colors duration-200 group-hover:brightness-125 ${
                  positive ? 'bg-profit/70' : 'bg-loss/70'
                }`}
                style={{ height: `${Math.max(6, pct)}%` }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-wide text-content-muted">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ReturnBars;
