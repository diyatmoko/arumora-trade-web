import { useRef } from 'react';
import { PieChart, LineChart, Bot, GitBranch, Shield, BarChart3 } from 'lucide-react';
import { useScrollReveal, useParallax } from '../../hooks/useScrollFx';

const FEATURES = [
  {
    icon: PieChart,
    title: 'Portfolio Intelligence',
    description: 'Unified equity, allocation, and attribution across every exchange account and bot.',
  },
  {
    icon: LineChart,
    title: 'Advanced Charts',
    description: 'Institutional-grade charting with timeframes, indicators, and drawing tools.',
  },
  {
    icon: Bot,
    title: 'Automated Trading',
    description: 'Run 24/7 bots with per-strategy risk limits and live PnL attribution.',
  },
  {
    icon: GitBranch,
    title: 'Strategy Builder',
    description: 'Compose entries, exits, and filters visually. Backtest before you deploy.',
  },
  {
    icon: Shield,
    title: 'Risk Monitoring',
    description: 'Margin utilization, drawdown guards, and liquidation distance at a glance.',
  },
  {
    icon: BarChart3,
    title: 'Trade Analytics',
    description: 'Win rate, profit factor, expectancy, and execution quality on every trade.',
  },
];

export function FeaturesSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useScrollReveal(scopeRef, { stagger: 0.08, y: 30 });
  useParallax(scopeRef, '[data-parallax]', 30);

  return (
    <section id="features" ref={scopeRef} className="relative py-24 sm:py-32" aria-label="Features">
      <div
        aria-hidden="true"
        data-parallax="1"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Platform</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for serious traders.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-content-secondary">
            Every module is designed for speed, density, and clarity &mdash; no decoration,
            only signal.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Platform features">
          {FEATURES.map((f) => (
            <li key={f.title} data-reveal>
              <div className="group h-full rounded-xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-line hover:bg-surface-raised">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent-line bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-[#04121a]">
                  <f.icon size={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-content">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-content-secondary">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturesSection;
