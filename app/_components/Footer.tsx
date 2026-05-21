import Image from 'next/image';
import Link from 'next/link';
import { LEGAL_PAGES } from '../legal/_data/pages';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" aria-label="CarFai home" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="CarFai"
                width={420}
                height={96}
                className="h-20 md:h-28 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm text-slate2 max-w-prose">
              <strong className="text-ink font-medium">
                Car Financial &amp; Administrative Intelligence
              </strong>
              {' '}— powered by AI. Cost tracking, OBD2 diagnostics, document
              scanning, and an advisor that actually knows your car.
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
              <li>
                <Link href="/pricing" className="hover:text-accent">
                  Pricing
                </Link>
              </li>
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
          <a
            href="mailto:carfai.info@gmail.com"
            className="hover:text-accent"
          >
            carfai.info@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
