import { Hero }        from './_sections/Hero';
import { Problem }     from './_sections/Problem';
import { ScanTrack }   from './_sections/ScanTrack';
import { Maintenance } from './_sections/Maintenance';
import { Valuation }   from './_sections/Valuation';
import { Advisor }     from './_sections/Advisor';
import { Fleet }       from './_sections/Fleet';
import { Pricing }     from './_sections/Pricing';
import { ClosingCTA }  from './_sections/ClosingCTA';

/**
 * H1b landing page — 9 sections.
 *
 * Order locked in docs/DESIGN_TOKENS.md §"Section plan v2".
 * Each section has a distinct visual treatment to avoid
 * monotony — see DESIGN_TOKENS for the motion-pattern map.
 *
 *   1. Hero        — splittext-reveal
 *   2. Problem     — static
 *   3. ScanTrack   — pinned-scrub (real screens crossfade)
 *   4. Maintenance — static split (OBD2 + AI calendar + expiry)
 *   5. Valuation   — dark band (Stripe-style stat callout)
 *   6. Advisor     — splittext-reveal
 *   7. Fleet       — horizontal-on-vertical
 *   8. Pricing     — sticky-stack
 *   9. ClosingCTA  — magnetic-cursor + splittext-reveal
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ScanTrack />
      <Maintenance />
      <Valuation />
      <Advisor />
      <Fleet />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
