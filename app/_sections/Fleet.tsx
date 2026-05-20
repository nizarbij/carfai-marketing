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
 * Section 7 — Fleet band. Named pattern: horizontal-on-vertical.
 *
 * Cards translate sideways inside a pinned container as the user
 * scrolls down. Each card = phone frame + real B2B screenshot +
 * one-line caption. Replaces the earlier all-text 4-card layout
 * once the founder shipped 3 real fleet screenshots.
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
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-paperDeep">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-4">
          For fleets
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-2xl leading-[1.1]">
          One product. From your weekend car to your 200-vehicle yard.
        </h2>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] will-change-transform items-stretch"
        >
          {cards.map((c, i) => (
            <article
              key={i}
              className="shrink-0 w-[88vw] md:w-[42rem] rounded-3xl border border-rule bg-paper p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center"
            >
              {/* Phone frame with the real fleet screenshot */}
              <div className="relative aspect-[9/19] w-[180px] md:w-[200px] rounded-[2rem] border-[8px] border-ink bg-ink overflow-hidden shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)] mx-auto">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="200px"
                  className="phone-screen-img"
                />
              </div>

              {/* Caption */}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
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
