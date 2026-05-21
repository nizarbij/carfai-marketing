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
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-40 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
        {/* Left: the pitch */}
        <div>
          <p className="font-mono text-sm md:text-base uppercase tracking-widest text-paper/50 mb-6">
            Vehicle valuation
          </p>

          <SplitTextReveal
            as="h2"
            className="text-3xl md:text-5xl font-medium tracking-tight max-w-xl leading-[1.1]"
          >
            Know what your car is actually worth.
          </SplitTextReveal>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-paper/70 max-w-prose leading-relaxed">
            CarFai cross-references current market listings, your
            service history, accident flags, and what other owners
            in your country are paying — then shows you a defended
            value with every factor that moves the number.
          </p>

          {/* Stat callout — flex-wrap so it doesn't overflow narrow phones.
              On mobile the items wrap into 2 rows with a tighter gap. */}
          <div className="mt-8 md:mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2 px-5 py-4 md:px-6 md:py-5 border border-paper/15 rounded-2xl bg-paper/[0.03] w-fit max-w-full">
            <span className="font-mono text-xs md:text-base uppercase tracking-widest text-paper/50">
              Estimated value
            </span>
            <span className="font-mono text-2xl md:text-4xl font-medium text-accent">
              $25,400
            </span>
            <span className="text-xs text-paper/40 w-full md:w-auto">
              ± 4% confidence band
            </span>
          </div>

          {/* Factor chips */}
          <ul className="mt-6 md:mt-8 flex flex-wrap gap-2 max-w-md">
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
        <div className="relative aspect-[9/19] max-h-[70vh] md:max-h-[78vh] mx-auto w-full max-w-[260px] md:max-w-xs rounded-[2.5rem] border-[10px] border-paper/15 bg-paper/[0.04] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
          {VALUATION_IMAGE_EXISTS ? (
            <Image
              src="/app-valuation.jpg"
              alt="CarFai vehicle valuation screen showing the estimated value, market band, and applied factors."
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="phone-screen-img"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <p className="font-mono text-base uppercase tracking-widest text-paper/40">
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
