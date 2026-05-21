import Image from 'next/image';
import Link from 'next/link';

/**
 * Editorial-restraint header — brand logo left, primary CTA right.
 * No nav megamenu, no signup-in-header. Two anchors only.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-paper/85 border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 h-24 flex items-center justify-between">
        <Link href="/" aria-label="CarFai home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="CarFai"
            width={320}
            height={72}
            priority
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pricing" className="text-slate2 hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/support" className="text-slate2 hover:text-ink transition-colors">
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
