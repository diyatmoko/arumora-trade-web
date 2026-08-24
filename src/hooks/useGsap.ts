import { useEffect, useLayoutEffect, useRef, useSyncExternalStore, type DependencyList, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out', duration: 0.7 });

export { gsap, ScrollTrigger };

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

export function useGsap(
  scopeRef: RefObject<HTMLElement | null>,
  setup: (scope: HTMLElement, reducedMotion: boolean) => void,
  deps: DependencyList = [],
): void {
  const reduced = usePrefersReducedMotion();
  const setupRef = useRef(setup);

  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
  });

  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (reduced) {
      setupRef.current(scope, true);
      return;
    }

    const ctx = gsap.context(() => setupRef.current(scope, false), scope);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, scopeRef, ...deps]);
}
