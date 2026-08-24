import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';

export function CtaSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useGsap(scopeRef, (scope, reducedMotion) => {
    const inner = scope.querySelector<HTMLElement>('[data-cta]');
    if (!inner) return;

    if (reducedMotion) {
      gsap.set(inner, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      inner,
      { opacity: 0, y: 36, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        scrollTrigger: { trigger: scope, start: 'top 75%', once: true },
      },
    );
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden py-28 sm:py-36" aria-label="Get started">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint opacity-70 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_50%,black,transparent)]" />

      <div data-cta className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your Trading Intelligence{' '}
          <span className="text-gradient">Starts Here.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-content-secondary">
          Connect your first account, deploy a strategy, and see your entire trading operation
          in one professional terminal.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/app" tabIndex={-1}>
            <Button variant="primary" size="lg">
              Launch TradeHub <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/login" tabIndex={-1}>
            <Button variant="secondary" size="lg">
              Create free account
            </Button>
          </Link>
        </div>
        <p className="num mt-6 text-[11px] text-content-faint">No credit card required &middot; Simulated data for demo</p>
      </div>
    </section>
  );
}

export default CtaSection;
