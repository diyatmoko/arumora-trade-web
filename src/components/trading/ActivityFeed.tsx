import type { ActivityItem } from '../../data/trading';

const TONE_DOT: Record<ActivityItem['tone'], string> = {
  profit: 'bg-profit',
  loss: 'bg-loss',
  info: 'bg-info',
  warn: 'bg-warn',
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ol className="relative space-y-0" aria-label="Recent activity">
      {items.map((item) => (
        <li key={item.id} className="group relative flex gap-3 px-4 py-3 transition-colors duration-150 hover:bg-surface-raised">
          <span className="num mt-0.5 shrink-0 text-[11px] leading-5 text-content-faint transition-colors duration-150 group-hover:text-content-muted">
            {item.time}
          </span>
          <span className="relative mt-[7px] flex shrink-0">
            <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[item.tone]}`} />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 h-[calc(100%+8px)] w-px -translate-x-1/2 bg-line last:hidden"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-content-secondary">
              <span className="font-medium text-content">{item.source}</span>
              {' \u00b7 '}
              {item.action}
            </p>
            {item.detail && (
              <p
                className={`num mt-0.5 truncate text-[11px] ${
                  item.tone === 'profit' ? 'text-profit-bright' : item.tone === 'loss' ? 'text-loss-bright' : 'text-content-muted'
                }`}
              >
                {item.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ActivityFeed;
