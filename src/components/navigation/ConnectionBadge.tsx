import { Wifi, WifiOff } from 'lucide-react';
import { useMarketStore } from '../../store/marketStore';

export function ConnectionBadge() {
  const connected = useMarketStore((s) => s.connected);
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
        connected
          ? 'border-profit/25 bg-profit-dim text-profit-bright'
          : 'border-warn/25 bg-warn-dim text-warn'
      }`}
    >
      {connected ? <Wifi size={11} /> : <WifiOff size={11} />}
      {connected ? (
        <>
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-profit opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-profit" />
          </span>
          Live
        </>
      ) : (
        'Reconnecting\u2026'
      )}
    </span>
  );
}

export default ConnectionBadge;
