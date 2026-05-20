'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section 5 — Fleet band. Named pattern: horizontal-on-vertical.
 *
 * Scroll down → cards translate sideways inside a pinned container.
 * Linear features pattern. Reads as "B2B is a real branch of the
 * product" without breaking page flow into a separate route.
 */
export function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const distance = track.scrollWidth - track.clientWidth;
    if (distance <= 0) return;

    const tween = gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger:  sectionRef.current,
        start:    'top top',
        end:      () => `+=${distance + 200}`,
        scrub:    0.5,
        pin:      true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const cards = [
    {
      eyebrow: 'fleet',
      title:   '1 vehicle to 200.',
      body:    'CarFai\'s personal advisor and the fleet dashboard are the same product. Add cars; nothing changes about how the advisor talks to you.',
    },
    {
      eyebrow: 'costs',
      title:   'Money, by vehicle.',
      body:    'Per-vehicle operating cost, leaderboards, and category drill-downs. Bring fuel cards, maintenance receipts, or both — same shape.',
    },
    {
      eyebrow: 'roles',
      title:   'Manager vs driver, not flat.',
      body:    'Drivers see only their own car. Managers see their assigned vehicles. Owners see the org. RLS-enforced — not a UI gate.',
    },
    {
      eyebrow: 'export',
      title:   'Exports your accountant wants.',
      body:    'Per-period CSV / PDF / Excel rollups with tax-deductible flags pre-applied. No re-keying.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-paperDeep">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
        <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-6">
          For fleets
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-2xl leading-[1.1]">
          One product. From your weekend car to your 200-vehicle yard.
        </h2>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] will-change-transform"
        >
          {cards.map((c, i) => (
            <article
              key={i}
              className="shrink-0 w-[80vw] md:w-[36rem] rounded-3xl border border-rule bg-paper p-8 md:p-12"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                {String(i + 1).padStart(2, '0')} · {c.eyebrow}
              </p>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink mb-4 leading-tight">
                {c.title}
              </h3>
              <p className="text-base md:text-lg text-slate2 leading-relaxed">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
