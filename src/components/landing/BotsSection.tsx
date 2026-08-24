import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BotCard } from '../trading/BotCard';
import { Button } from '../ui/Button';
import { useBotsStore } from '../../store/botsStore';
import { useScrollReveal } from '../../hooks/useScrollFx';

export function BotsSection() {
  const scopeRef = useRef<HTMLElement>(null);
  const bots = useBotsStore((s) => s.bots);
  const toggle = useBotsStore((s) => s.toggle);
  const setStatus = useBotsStore((s) => s.setStatus);
  const featured = bots.slice(0, 3);

  useScrollReveal(scopeRef, { stagger: 0.12, y: 34 });

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32" aria-label="Trading bots">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div data-reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Automation</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bots that trade while you sleep.
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-content-secondary">
              Deploy battle-tested strategies with per-bot risk limits, live PnL attribution,
              and one-click control.
            </p>
          </div>
          <div data-reveal>
            <Link to="/app/bots" tabIndex={-1}>
              <Button variant="secondary" size="md">
                Open bot terminal <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((bot) => (
            <div key={bot.id} data-reveal>
              <BotCard bot={bot} onToggle={toggle} onStop={(id) => setStatus(id, 'stopped')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BotsSection;
