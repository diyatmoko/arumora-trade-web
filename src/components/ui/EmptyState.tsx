import type { ReactNode } from 'react';
import { LineChart } from 'lucide-react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-raised text-content-muted">
        {icon ?? <LineChart size={18} />}
      </div>
      <h3 className="text-sm font-semibold text-content">{title}</h3>
      <p className="mt-1 max-w-xs text-xs leading-relaxed text-content-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
