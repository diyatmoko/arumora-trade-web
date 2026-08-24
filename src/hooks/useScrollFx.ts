import { type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { useGsap } from './useGsap';

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
): void {
  const {
    selector = '[data-reveal]',
    y = 28,
    stagger = 0.09,
    duration = 0.7,
    start = 'top 78%',
  } = options;

  useGsap(scopeRef, (scope, reducedMotion) => {
    const targets = scope.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    gsap.set(targets, { opacity: 0, y });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      scrollTrigger: { trigger: scope, start, once: true },
    });
  }, []);
}

export function usePinnedScrub(
  scopeRef: RefObject<HTMLElement | null>,
  buildTimeline: (tl: gsap.core.Timeline, scope: HTMLElement) => void,
  end = '+=2400',
): void {
  useGsap(scopeRef, (scope, reducedMotion) => {
    if (reducedMotion) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });
    buildTimeline(tl, scope);
  }, []);
}

export function useParallax(
  scopeRef: RefObject<HTMLElement | null>,
  selector = '[data-parallax]',
  maxShift = 60,
): void {
  useGsap(scopeRef, (scope, reducedMotion) => {
    const targets = scope.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0 || reducedMotion) return;

    targets.forEach((el) => {
      const depth = Number(el.dataset.parallax ?? '1');
      gsap.fromTo(
        el,
        { y: maxShift * depth },
        {
          y: -maxShift * depth,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  }, []);
}
