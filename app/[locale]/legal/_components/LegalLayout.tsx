import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LEGAL_PAGES } from '../_data/pages';

interface Props {
  slug:     string;
  title:    string;
  markdown: string;
}

export function LegalLayout({ slug, title, markdown }: Props) {
  const tl = useTranslations('LegalPages');
  const t  = useTranslations('Footer'); // reuse legalHeading

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-slate2 hover:text-accent">
          CarFai
        </Link>
        <span className="text-rule mx-2">/</span>
        <span className="text-slate2">{title}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="md:sticky md:top-12 md:self-start">
          <h2 className="text-xs uppercase tracking-wider text-slate2 mb-3">
            {t('legalHeading')}
          </h2>
          <ul className="space-y-1.5 text-sm">
            {LEGAL_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className={
                    p.slug === slug
                      ? 'text-ink font-semibold'
                      : 'text-slate2 hover:text-accent'
                  }
                >
                  {tl(p.slug as 'privacy' | 'terms' | 'eula' | 'ai-disclosure' | 'cookies' | 'dpa' | 'aup')}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <article className="prose-legal max-w-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
