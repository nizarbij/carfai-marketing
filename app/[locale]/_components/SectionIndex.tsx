'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section index kicker. Replaces the bare "ABOUT THIS SECTION" eyebrow
 * with a typographic move that earns the repetition: an enumerated
 * counter ("04 / 09") + a label + a hairline rule that scrubs in as
 * the section enters the viewport.
 *
 * The variety in the number is what saves the recurring kicker from
 * reading as AI scaffolding (brand-register warning). Number alone is
 * boring; label alone repeats; together they compose as
 * "01 — HERO ··· 02 — PROBLEM ··· 03 — SCAN & TRACK ···", which reads
 * as deliberate editorial structure.
 *
 * `surface` "light"  → cream-paper sections. Mono kicker in slate2,
 *                      number in accent teal.
 *           "dark"   → ink sections (Valuation, Closing). Kicker in
 *                      paper/60, number in paper.
 *
 * `align`   "start" (default) → left in LTR, right in RTL.
 *           "center"          → centred. For Closing CTA.
 */
type Surface = 'light' | 'dark';
type Align   = 'start' | 'center';

interface Props {
  number: number;
  total?: number;
  label?: string;
  surface?: Surface;
  align?:  Align;
  className?: string;
}

const TONE = {
  light: { kicker: 'text-slate2',     number: 'text-accent',  rule: 'bg-rule' },
  dark:  { kicker: 'text-paper/60',   number: 'text-paper',   rule: 'bg-paper/15' },
};

export function SectionIndex({
  number,
  total = 9,
  label,
  surface = 'light',
  align = 'start',
  className = '',
}: Props) {
  const ruleRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const t = TONE[surface];

  useGSAP(
    () => {
      if (!ruleRef.current || reduced) return;
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.to(ruleRef.current, {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ruleRef.current,
          start:   'top 85%',
          once:    true,
        },
      });
    },
    { dependencies: [reduced] },
  );

  const justify = align === 'center' ? 'justify-center' : 'justify-start';

  return (
    <div className={`flex items-center gap-4 ${justify} ${className}`}>
      <span className={`font-mono text-sm md:text-base uppercase tracking-widest ${t.kicker}`}>
        <span className={`${t.number} font-medium`}>
          {String(number).padStart(2, '0')}
        </span>
        <span className="mx-2 opacity-50">/</span>
        <span>{String(total).padStart(2, '0')}</span>
        {label && (
          <>
            <span className="mx-2 opacity-50">·</span>
            <span>{label}</span>
          </>
        )}
      </span>
      <span
        ref={ruleRef}
        aria-hidden
        className={`h-px flex-1 max-w-[120px] md:max-w-[200px] ${t.rule}`}
      />
    </div>
  );
}
