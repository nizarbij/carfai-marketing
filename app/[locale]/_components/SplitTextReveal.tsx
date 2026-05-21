'use client';

import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLocale } from 'next-intl';
import { useReducedMotion } from './useReducedMotion';
import { RTL_LOCALES, type Locale } from '@/i18n/routing';

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
  const reduced = useReducedMotion();
  const locale  = useLocale() as Locale;
  const isRtl   = RTL_LOCALES.includes(locale);

  useGSAP(
    () => {
      if (!ref.current || reduced) return;

      // RTL fallback: SplitType wraps each character in its own <span>,
      // which forces Arabic letters to render in their isolated form and
      // destroys ligatures (visible as ugly gaps between joined letters).
      // For RTL locales, animate the whole heading instead of per-char.
      // The motion shape (opacity + small y) is the same — just one tween
      // on the wrapper, not 30 staggered tweens on each glyph.
      if (isRtl) {
        gsap.set(ref.current, { y: 8, opacity: 0 });
        gsap.to(ref.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: onScroll
            ? { trigger: ref.current, start: 'top 80%', once: true }
            : undefined,
        });
        return;
      }

      const split = new SplitType(ref.current, { types: 'chars,words' });
      const targets = split.chars ?? [];

      gsap.set(targets, { y: 8, opacity: 0 });
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.018,
        scrollTrigger: onScroll
          ? { trigger: ref.current, start: 'top 80%', once: true }
          : undefined,
      });

      // gsap.context() (set up by useGSAP) reverts the tween + ScrollTrigger
      // automatically on unmount. SplitType is outside that scope, so its
      // revert is registered as a manual cleanup.
      return () => split.revert();
    },
    { scope: ref, dependencies: [onScroll, reduced, isRtl] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
