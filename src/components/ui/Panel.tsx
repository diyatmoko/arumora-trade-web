import type { HTMLAttributes, ReactNode } from 'react';

type PanelProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title?: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  bodyClassName?: string;
};

export function Panel({
  title,
  subtitle,
  actions,
  className = '',
  bodyClassName = '',
  children,
  ...rest
}: PanelProps) {
  return (
    <section
      className={`rounded-xl border border-line bg-surface shadow-card ${className}`}
      {...rest}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            {typeof title === 'string' ? (
              <h2 className="truncate text-[13px] font-semibold tracking-wide text-content uppercase">
                {title}
              </h2>
            ) : (
              title
            )}
            {subtitle && <p className="mt-0.5 truncate text-xs text-content-muted">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export default Panel;
