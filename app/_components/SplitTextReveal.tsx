'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children:  React.ReactNode;
  /**
   * Whether the reveal triggers on scroll into view (default true)
   * or fires immediately on mount (for the hero, which is in view).
   */
  onScroll?: boolean;
  /** Optional className on the wrapper. */
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

/**
 * `splittext-reveal` named pattern (see studio-landing-page skill).
 * Letters animate in with a tight stagger — opacity 0→1 + y 8px→0.
 * Used on hero h1 + section heads + closing CTA.
 *
 * Uses SplitType (free) rather than GSAP SplitText (paid plugin).
 * Falls back to a plain element render server-side, so SEO copy is
 * the full string.
 */
export function SplitTextReveal({
  children,
  onScroll = true,
  className = '',
  as: Tag = 'h2',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: 'chars,words' });

    const targets = split.chars ?? [];
    gsap.set(targets, { y: 8, opacity: 0 });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.018,
      scrollTrigger: onScroll
        ? {
            trigger: ref.current,
            start:   'top 80%',
            once:    true,
          }
        : undefined,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [onScroll]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
