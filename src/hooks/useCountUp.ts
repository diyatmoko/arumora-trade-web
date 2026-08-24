import { type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { useGsap } from './useGsap';

type CountUpOptions = {
  start?: string;
  duration?: number;
  format: (value: number) => string;
};

export function useCountUp(
  scopeRef: RefObject<HTMLElement | null>,
  targetValue: number,
  options: CountUpOptions,
): void {
  const { start = 'top 85%', duration = 1.4, format } = options;

  useGsap(scopeRef, (scope, reducedMotion) => {
    const targets = scope.querySelectorAll<HTMLElement>('[data-count]');
    if (targets.length === 0) return;

    targets.forEach((el) => {
      const raw = el.dataset.count;
      if (raw === undefined) return;
      const value = Number(raw);

      if (reducedMotion) {
        el.textContent = format(value);
        return;
      }

      const state = { v: 0 };
      gsap.to(state, {
        v: Number.isFinite(value) ? value : targetValue,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start, once: true },
        onUpdate: () => {
          el.textContent = format(state.v);
        },
      });
    });
  }, []);
}

export function useDrawPath(
  scopeRef: RefObject<HTMLElement | null>,
  opts: { scrub?: boolean; start?: string; end?: string; stagger?: number } = {},
): void {
  const { scrub = false, start = 'top 80%', end = 'bottom 60%', stagger = 0.15 } = opts;

  useGsap(scopeRef, (scope, reducedMotion) => {
    const paths = scope.querySelectorAll<SVGPathElement>('[data-draw]');
    if (paths.length === 0) return;

    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      if (reducedMotion) {
        path.style.strokeDashoffset = '0';
        return;
      }
      path.style.strokeDashoffset = `${len}`;
    });

    if (reducedMotion) {
      const fills = scope.querySelectorAll<HTMLElement>('[data-fade-in]');
      gsap.set(fills, { opacity: 1 });
      return;
    }

    gsap.to(paths, {
      strokeDashoffset: 0,
      ease: 'none',
      stagger,
      scrollTrigger: {
        trigger: scope,
        start,
        end,
        scrub: scrub ? true : false,
        once: !scrub,
      },
    });

    const fills = scope.querySelectorAll<HTMLElement>('[data-fade-in]');
    if (fills.length > 0) {
      gsap.fromTo(
        fills,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          delay: 0.5,
          scrollTrigger: { trigger: scope, start, once: true },
        },
      );
    }
  }, []);
}
