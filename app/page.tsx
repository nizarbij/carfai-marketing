import Link from 'next/link';
import { LEGAL_PAGES } from './legal/_data/pages';

/**
 * H1a placeholder home page — minimal landing that satisfies the
 * "lives at carfai.app" requirement so the store-listing URLs resolve.
 * H1b replaces this with the full marketing landing.
 */
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-6">
        CarFai
      </p>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
        AI-assisted vehicle ownership.
      </h1>
      <p className="mt-6 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
        Cost tracking, OBD2 diagnostics, document scanning, valuation, and
        an advisor that answers questions about <em>your</em> car using
        your own history — not generic advice.
      </p>

      <p className="mt-10 text-sm text-slate2">
        The marketing pages land in Sprint 4. In the meantime:
      </p>

      <ul className="mt-4 grid gap-2 text-sm">
        {LEGAL_PAGES.map(p => (
          <li key={p.slug}>
            <Link
              href={`/${p.slug}`}
              className="text-accent underline decoration-1 underline-offset-2 hover:no-underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-xs text-slate2">
        Questions? <a href="mailto:hello@carfai.app" className="text-accent underline">hello@carfai.app</a>
      </p>
    </div>
  );
}
