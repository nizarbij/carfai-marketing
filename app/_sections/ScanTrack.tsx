'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    if (!sectionRef.current) return;
    const steps = stepRefs.current;
    if (steps.length === 0) return;

    // Initial state: step 0 visible, others hidden
    gsap.set(steps.slice(1), { opacity: 0, y: 24 });

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

    // Crossfade step 0 → 1
    tl.to(steps[0],  { opacity: 0, y: -24, duration: 1 }, 0)
      .to(steps[1],  { opacity: 1, y: 0,   duration: 1 }, 0)
      // step 1 → 2
      .to(steps[1],  { opacity: 0, y: -24, duration: 1 }, 1.2)
      .to(steps[2],  { opacity: 1, y: 0,   duration: 1 }, 1.2);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const steps = [
    {
      eyebrow: '01 · scan',
      title:   'Point. Don’t type.',
      body:    'Snap any receipt, repair order, registration, or quote. The model pulls amount, vendor, date, and category before you put the phone down.',
    },
    {
      eyebrow: '02 · categorize',
      title:   'Goes in the right bucket.',
      body:    'Fuel, insurance, maintenance, parts, parking, tickets — categorised at the line-item level. Tax-deductible flags stay flagged.',
    },
    {
      eyebrow: '03 · trend',
      title:   'See what it actually costs you.',
      body:    'Per month. Per category. Per vehicle. Per year-over-year. Without a single manual entry.',
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
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                {s.eyebrow}
              </p>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-ink leading-[1.1] mb-4">
                {s.title}
              </h3>
              <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Right: app screenshot slot. */}
        <div className="aspect-[9/16] max-h-[78vh] rounded-3xl border border-rule bg-paperDeep flex items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-slate2 text-center px-6">
            app screenshot slot<br />
            (analysisScreen + cost rollup)
          </p>
        </div>
      </div>
    </section>
  );
}
