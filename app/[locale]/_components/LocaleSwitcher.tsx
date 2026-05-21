'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, LOCALE_LABELS, type Locale } from '@/i18n/routing';

/**
 * Compact locale selector for the header + mobile menu.
 * Replaces the current path with the same path on the chosen
 * locale, preserving the user's position on the site.
 *
 * Implementation: a native <select> for a11y + no JS dep.
 * Styled to look like a small chip.
 */
export function LocaleSwitcher() {
  const locale     = useLocale() as Locale;
  const router     = useRouter();
  const pathname   = usePathname();
  const [, start]  = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    start(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="relative inline-flex items-center text-sm">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={onChange}
        className="appearance-none bg-transparent border border-rule rounded-full pl-3 pr-7 py-1 text-ink hover:bg-paperDeep transition-colors cursor-pointer font-mono text-xs uppercase tracking-wider"
        aria-label="Language"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate2 text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}
