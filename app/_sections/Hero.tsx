'use client';

import Link from 'next/link';
import { SplitTextReveal } from '../_components/SplitTextReveal';

/**
 * Section 1 — Hero.
 * Motion: splittext-reveal on the headline (fires on mount, not on scroll).
 * Imagery: placeholder slot. Replace with a real product photograph
 * generated via Nano Banana before launch.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-8">
          For drivers · for fleets
        </p>

        <SplitTextReveal
          as="h1"
          onScroll={false}
          className="text-5xl md:text-7xl font-medium tracking-tight text-ink max-w-4xl leading-[1.05]"
        >
          A second opinion for your car.
        </SplitTextReveal>

        <p className="mt-8 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
          CarFai watches your maintenance receipts, OBD2 codes, and
          ownership history, then tells you what they actually mean —
          using your data, not the internet's.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#start"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white hover:bg-accentDeep transition-colors font-medium"
          >
            Start free
            <span aria-hidden>→</span>
          </a>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-3 text-ink hover:text-accentDeep transition-colors font-medium"
          >
            See pricing
          </Link>
        </div>

        {/*
          Hero imagery slot.
          TODO(H1b step 6): replace with a real photograph generated via
          Nano Banana — e.g. dashboard cluster at golden hour, or a
          close-up of a hand holding a phone showing the AnalysisScreen.
          Until that lands, the box keeps its proportions so the rest of
          the layout stays accurate.
        */}
        <div className="mt-20 aspect-[16/9] rounded-2xl border border-rule bg-paperDeep flex items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-slate2">
            hero image slot — replace via nano banana
          </p>
        </div>
      </div>
    </section>
  );
}
