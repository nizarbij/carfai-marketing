import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import { SplitTextReveal } from '../_components/SplitTextReveal';

// Section 5 — Vehicle valuation (K-section work).
// Pattern: dark band — pulls the eye out of the cream rhythm.
// Big stat-style headline + 3 factor chips + screenshot slot on
// the right. Stripe stat-callout vibe. Splittext-reveal on the
// headline keeps it consistent with the Advisor section after it.

const VALUATION_IMAGE_EXISTS = existsSync(
  join(process.cwd(), 'public', 'app-valuation.jpg'),
);

const factors = [
  { label: '+ Service history',     delta: '+8%' },
  { label: '− Heavy mechanical', delta: '−6%' },
  { label: '+ Low community miles', delta: '+3%' },
  { label: '− Market softness',  delta: '−2%' },
];

export function Valuation() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
        {/* Left: the pitch */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50 mb-6">
            Vehicle valuation
          </p>

          <SplitTextReveal
            as="h2"
            className="text-3xl md:text-5xl font-medium tracking-tight max-w-xl leading-[1.1]"
          >
            Know what your car is actually worth.
          </SplitTextReveal>

          <p className="mt-8 text-base md:text-lg text-paper/60 max-w-prose leading-relaxed">
            CarFai cross-references current market listings, your
            service history, accident flags, and what other owners
            in your country are paying — then shows you a defended
            value with every factor that moves the number.
          </p>

          {/* Stat callout */}
          <div className="mt-12 inline-flex items-baseline gap-4 px-6 py-5 border border-paper/15 rounded-2xl bg-paper/[0.03]">
            <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Estimated value
            </span>
            <span className="font-mono text-3xl md:text-4xl font-medium text-accent">
              $25,400
            </span>
            <span className="text-xs text-paper/40">
              ± 4% confidence band
            </span>
          </div>

          {/* Factor chips */}
          <ul className="mt-8 flex flex-wrap gap-2 max-w-md">
            {factors.map((f) => (
              <li
                key={f.label}
                className="font-mono text-xs px-3 py-1.5 border border-paper/15 rounded-full text-paper/80"
              >
                <span className="text-paper">{f.label}</span>{' '}
                <span className="text-paper/40">{f.delta}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: phone-shaped frame for the Valuation screen */}
        <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-paper/15 bg-paper/[0.04] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
          {VALUATION_IMAGE_EXISTS ? (
            <Image
              src="/app-valuation.jpg"
              alt="CarFai vehicle valuation screen showing the estimated value, market band, and applied factors."
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
                drop the Valuation<br />screen at<br />
                /public/app-valuation.jpg
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
