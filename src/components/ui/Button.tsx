import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-[#04121a] font-semibold hover:bg-accent-strong hover:shadow-glow active:bg-accent',
  secondary:
    'bg-surface-raised text-content border border-line-strong hover:border-line hover:bg-surface-hover hover:text-white',
  ghost: 'text-content-secondary hover:bg-surface-overlay hover:text-content',
  danger:
    'bg-loss-dim text-loss-bright border border-loss/25 hover:bg-loss/20 hover:text-white',
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-[38px] px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-sm gap-2 rounded-xl',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({
  label,
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-content-muted transition-colors duration-200 hover:bg-surface-overlay hover:text-content focus-visible:outline-2 focus-visible:outline-accent ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
