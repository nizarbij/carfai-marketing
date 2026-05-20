'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
 */
export function SmoothScroll() {
  useEffect(() => {
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
  }, []);

  return null;
}
