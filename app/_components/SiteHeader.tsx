import Link from 'next/link';

/**
 * Editorial-restraint header — wordmark left, primary CTA right.
 * No nav megamenu, no signup-in-header. Two anchors only.
 *
 * Mirrors the Linear / Stripe header rhythm without dropping a
 * link to every product surface, since this site has none.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-paper/85 border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-ink hover:text-accentDeep transition-colors"
          aria-label="CarFai home"
        >
          carfai
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/pricing"
            className="text-slate2 hover:text-ink transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/support"
            className="text-slate2 hover:text-ink transition-colors"
          >
            Support
          </Link>
          <a
            href="#start"
            className="px-3 py-1.5 rounded-full bg-ink text-paper hover:bg-accentDeep transition-colors"
          >
            Start free
          </a>
        </nav>
      </div>
    </header>
  );
}
