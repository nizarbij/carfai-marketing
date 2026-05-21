'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section 3 — Scan → Track. Named pattern: pinned-scrub.
 *
 * The section pins for ~1.5 viewport-heights while three "step cards"
 * crossfade through inside it. This is the Apple Vision Pro hero
 * pattern — page locks, internal content scrubs.
 *
 * Steps:
 *   1. snap (point the camera at a receipt)
 *   2. extract (Claude pulls amount + vendor + category)
 *   3. trend (cost lands in the monthly rollup chart)
 */
export function ScanTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const screenRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const steps = stepRefs.current;
      const screens = screenRefs.current;
      if (steps.length === 0 || screens.length === 0) return;

      gsap.set(steps.slice(1),   { opacity: 0, y: 24 });
      gsap.set(screens.slice(1), { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:  sectionRef.current,
          start:    'top top',
          end:      '+=150%',
          scrub:    0.6,
          pin:      true,
          anticipatePin: 1,
        },
      });

      // Copy crossfade (step 0 → 1 → 2)
      tl.to(steps[0], { opacity: 0, y: -24, duration: 1 }, 0)
        .to(steps[1], { opacity: 1, y: 0,   duration: 1 }, 0)
        .to(steps[1], { opacity: 0, y: -24, duration: 1 }, 1.2)
        .to(steps[2], { opacity: 1, y: 0,   duration: 1 }, 1.2);

      // Screenshot crossfade aligned to the copy beats
      tl.to(screens[0], { opacity: 0, duration: 1 }, 0)
        .to(screens[1], { opacity: 1, duration: 1 }, 0)
        .to(screens[1], { opacity: 0, duration: 1 }, 1.2)
        .to(screens[2], { opacity: 1, duration: 1 }, 1.2);
    },
    { scope: sectionRef },
  );

  const steps = [
    {
      eyebrow: '01 · scan',
      title:   'Point. Don’t type.',
      body:    'Snap any receipt, repair order, registration, or quote. The model pulls amount, vendor, date, and category before you put the phone down.',
      image:   '/app-scan-extract.jpg',
      alt:     'CarFai Review & Refine screen showing date, vendor and amount auto-extracted from a maintenance receipt, plus AI-inferred type, category, and line items.',
    },
    {
      eyebrow: '02 · categorize',
      title:   'Goes in the right bucket.',
      body:    'Fuel, insurance, maintenance, parts, parking, tickets — categorised at the line-item level. Tax-deductible flags stay flagged.',
      image:   '/app-documents.jpg',
      alt:     'Documents screen grouping receipts into Contravention, Fuel, Insurance, Maintenance, Parking, and Toll folders.',
    },
    {
      eyebrow: '03 · trend',
      title:   'See what it actually costs you.',
      body:    'Per month. Per category. Per vehicle. Per year-over-year. Without a single manual entry.',
      image:   '/app-analytics-spending.jpg',
      alt:     'Analytics screen with monthly spending totals, average per month, document counts, and trend chart.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 h-full grid md:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left: the three step cards stack on top of each other */}
        <div className="relative h-72 md:h-80">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) stepRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
                {s.eyebrow}
              </p>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-ink leading-[1.1] mb-4">
                {s.title}
              </h3>
              <p className="text-lg md:text-xl text-slate2 leading-relaxed max-w-prose">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Right: phone-shaped frame holding the 3 crossfading screenshots */}
        <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-ink bg-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)]">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) screenRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 320px, 80vw"
                className="phone-screen-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
