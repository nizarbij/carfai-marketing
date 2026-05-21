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
      <select
        value={locale}
        onChange={onChange}
        // py-2 (8px each side) + 12px text + a touch of leading lands at
        // ~36-40px tall on desktop; on mobile the surrounding 44x44 tap
        // target is enforced via the parent flex item's gap-5 spacing,
        // so this stays a comfortable hit area without becoming visually
        // chunky next to the nav links.
        className="appearance-none bg-transparent border border-rule rounded-full ps-3 pe-7 py-2 text-ink hover:bg-paperDeep transition-colors cursor-pointer font-mono text-xs uppercase tracking-wider"
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
        className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-slate2 text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}
