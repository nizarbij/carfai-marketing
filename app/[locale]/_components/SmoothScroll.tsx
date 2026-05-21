'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth-scroll + GSAP ScrollTrigger integration.
 * Mounted once at the root layout. Drives every pinned-scrub /
 * sticky-stack / horizontal-on-vertical section on the page.
 *
 * Lenis is necessary because ScrollTrigger needs consistent scroll
 * deltas across browsers; native scroll-snap behaviour on Safari
 * vs Chrome diverges enough to wreck the pinned-scrub timings.
 *
 * Suppressed when the user prefers reduced motion: Lenis is the
 * source of the scrolling-through-syrup feel, so we fall back to
 * native scroll. ScrollTrigger still works against native scroll;
 * the pinned sections check reduced-motion themselves and skip.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
