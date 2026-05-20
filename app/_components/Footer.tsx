import Link from 'next/link';
import { LEGAL_PAGES } from '../legal/_data/pages';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="font-mono text-lg tracking-tight">
              CarFai
            </Link>
            <p className="mt-3 text-sm text-slate2 max-w-prose">
              AI-assisted vehicle ownership. Cost tracking, OBD2 diagnostics,
              document scanning, and an advisor that actually knows your car.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate2 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              {/* H1b will fill in /pricing, /contact, /support, /press */}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate2 mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              {LEGAL_PAGES.map(p => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rule text-xs text-slate2 flex flex-wrap gap-x-6 gap-y-2">
          <span>© {year} CarFai</span>
          <span>Built in Québec.</span>
          <a
            href="mailto:privacy@carfai.app"
            className="hover:text-accent"
          >
            privacy@carfai.app
          </a>
        </div>
      </div>
    </footer>
  );
}
