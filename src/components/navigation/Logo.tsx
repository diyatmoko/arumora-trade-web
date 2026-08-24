import { Link } from 'react-router-dom';

export function Logo({ to = '/', compact = false }: { to?: string; compact?: boolean }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-accent"
      aria-label="TradeHub home"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-line bg-accent-soft">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1.5 9.5 5 5l2.6 2.8L12.5 2" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 2h3.5v3.5" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[15px] font-bold tracking-tight text-white">
          Trade<span className="text-accent">Hub</span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
