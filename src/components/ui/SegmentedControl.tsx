type Option<V extends string> = { label: string; value: V };

export function SegmentedControl<V extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = '',
}: {
  options: Option<V>[];
  value: V;
  onChange: (v: V) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-raised p-0.5 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
              active
                ? 'bg-surface-overlay text-content shadow-card'
                : 'text-content-muted hover:text-content-secondary'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
