import { Hero }       from './_sections/Hero';
import { Problem }    from './_sections/Problem';
import { ScanTrack }  from './_sections/ScanTrack';
import { Advisor }    from './_sections/Advisor';
import { Fleet }      from './_sections/Fleet';
import { Pricing }    from './_sections/Pricing';
import { ClosingCTA } from './_sections/ClosingCTA';

/**
 * H1b landing page.
 *
 * Section order (locked in docs/DESIGN_TOKENS.md, do not reorder
 * without re-running the studio-landing-page skill rhythm check):
 *
 *   1. Hero        — splittext-reveal
 *   2. Problem     — static
 *   3. ScanTrack   — pinned-scrub
 *   4. Advisor     — splittext-reveal
 *   5. Fleet       — horizontal-on-vertical
 *   6. Pricing     — sticky-stack
 *   7. ClosingCTA  — magnetic-cursor + splittext-reveal
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ScanTrack />
      <Advisor />
      <Fleet />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
