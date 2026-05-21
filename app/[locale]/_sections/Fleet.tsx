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
 * Section 7 — Fleet band.
 *
 * Desktop (md+): horizontal-on-vertical scroll. Section pins; cards
 *   translate sideways as the user scrolls down. GSAP ScrollTrigger
 *   does the pinning; matchMedia gates the timeline so it only
 *   registers on md+ widths.
 * Mobile (< md): native horizontal-swipe carousel with CSS
 *   scroll-snap. No GSAP, no pin. Each card is a full-width
 *   swipeable panel.
 */

const cards = [
  {
    image:   '/app-fleet-home.jpg',
    eyebrow: 'B2B home',
    title:   'Pick a fleet. See what’s overdue.',
    body:    'Same product as the personal app, plus the org switcher. A driver sees their own car; an owner sees the whole fleet.',
    alt:     'B2B home screen for the Entr organization showing fleet analytics, a 2024 Lamborghini Urus with an oil-change-overdue flag, and driver assignment.',
  },
  {
    image:   '/app-fleet-overview.jpg',
    eyebrow: 'Overview',
    title:   'Team, vehicles, docs, AI usage. One screen.',
    body:    'Seats used, vehicles, documents handled, AI tokens remaining. Quick-actions for inviting members, adding vehicles, opening analytics.',
    alt:     'Fleet overview screen showing team 7/20, 8 vehicles, 25 documents, AI actions remaining, plus quick-action shortcuts.',
  },
  {
    image:   '/app-fleet-analytics.jpg',
    eyebrow: 'Analytics',
    title:   'Spend by category. Top cost vehicles. /km or total.',
    body:    'Per-period rollups with category breakdown and a per-vehicle cost leaderboard. Toggle between total spend and per-km efficiency.',
    alt:     'Fleet analytics screen with a 12-month spend-by-category bar chart and a top-5 cost-vehicles list led by a 2022 Ferrari 458.',
  },
];

export function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pin-and-translate ONLY at md+ widths. Mobile uses native
      // horizontal scroll (CSS only) so it doesn't get trapped in
      // a too-tall pinned viewport.
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.scrollWidth - track.clientWidth;
        if (distance <= 0) return;

        gsap.to(track, {
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
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-paperDeep md:h-screen md:overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-20">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-4">
          For fleets
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-2xl leading-[1.1]">
          One product. From your weekend car to your 200-vehicle yard.
        </h2>
      </div>

      {/* ── Mobile: native CSS swipe carousel ── */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 px-6 pb-12 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((c, i) => (
          <article
            key={i}
            className="shrink-0 w-[85vw] snap-start rounded-3xl border border-rule bg-paper p-6 flex flex-col gap-5"
          >
            <div className="relative aspect-[9/19] w-full max-w-[200px] mx-auto rounded-[1.75rem] border-[8px] border-ink bg-ink overflow-hidden shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)]">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="200px"
                className="phone-screen-img"
              />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-accent mb-2">
                {String(i + 1).padStart(2, '0')} · {c.eyebrow}
              </p>
              <h3 className="text-xl font-medium tracking-tight text-ink leading-tight mb-2">
                {c.title}
              </h3>
              <p className="text-base text-slate2 leading-relaxed">
                {c.body}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="md:hidden px-6 pb-12 -mt-6 text-xs text-slate2 font-mono">
        ← swipe →
      </p>

      {/* ── Desktop: GSAP horizontal-on-vertical pin track ── */}
      <div className="hidden md:block overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 px-[max(1.5rem,calc((100vw-72rem)/2))] will-change-transform items-stretch"
        >
          {cards.map((c, i) => (
            <article
              key={i}
              className="shrink-0 w-[42rem] rounded-3xl border border-rule bg-paper p-10 grid grid-cols-[auto_1fr] gap-8 items-center"
            >
              <div className="relative aspect-[9/19] w-[200px] rounded-[2rem] border-[8px] border-ink bg-ink overflow-hidden shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)] mx-auto">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="200px"
                  className="phone-screen-img"
                />
              </div>

              <div>
                <p className="font-mono text-base uppercase tracking-widest text-accent mb-3">
                  {String(i + 1).padStart(2, '0')} · {c.eyebrow}
                </p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink leading-tight mb-3">
                  {c.title}
                </h3>
                <p className="text-lg text-slate2 leading-relaxed">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
