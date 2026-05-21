'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { StoreBadges } from './StoreBadges';
import { LocaleSwitcher } from './LocaleSwitcher';

/**
 * Editorial-restraint header.
 *
 * Desktop (md+): brand logo left, horizontal nav right (Pricing /
 *   Support / Start-free pill) + LocaleSwitcher.
 * Mobile (< md): brand logo left, hamburger button right. Tap opens
 *   a slide-down panel with the same links + the store badges +
 *   LocaleSwitcher so visitors can change language and download
 *   the app from the panel without scrolling.
 */
export function SiteHeader() {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-paper/85 border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label={t('ariaHome')}
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="CarFai"
            width={420}
            height={96}
            priority
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/pricing" className="text-slate2 hover:text-ink transition-colors">
            {t('pricing')}
          </Link>
          <Link href="/support" className="text-slate2 hover:text-ink transition-colors">
            {t('support')}
          </Link>
          <LocaleSwitcher />
          <a
            href="#start"
            className="px-3 py-1.5 rounded-full bg-ink text-paper hover:bg-accentDeep transition-colors"
          >
            {t('startFree')}
          </a>
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={open ? t('menuClose') : t('menuOpen')}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -me-2 rounded-full hover:bg-paperDeep transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <Hamburger open={open} />
        </button>
      </div>

      {/* Mobile slide-down panel */}
      <div
        id="mobile-menu"
        className={
          'md:hidden overflow-hidden border-t border-rule bg-paper/95 backdrop-blur-sm transition-[max-height,opacity] duration-300 ease-out ' +
          (open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <nav className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-5">
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="text-lg text-ink hover:text-accentDeep transition-colors"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/support"
            onClick={() => setOpen(false)}
            className="text-lg text-ink hover:text-accentDeep transition-colors"
          >
            {t('support')}
          </Link>
          <a
            href="#start"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper hover:bg-accentDeep transition-colors font-medium"
          >
            {t('startFree')}
            <span aria-hidden className="arrow-rtl-flip">→</span>
          </a>

          {/* Locale switcher in mobile menu */}
          <div className="pt-2">
            <LocaleSwitcher />
          </div>

          {/* Divider + store badges so the app is one tap away from the menu */}
          <div className="pt-4 mt-2 border-t border-rule">
            <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-3">
              {t('orDownload')}
            </p>
            <StoreBadges variant="pill" surface="light" />
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ─── Hamburger icon (CSS-only, no svg lib) ──────────────────────────────── */

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block w-5 h-4">
      <span
        className={
          'absolute left-0 right-0 h-[2px] bg-ink rounded transition-transform duration-300 ease-out ' +
          (open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0')
        }
      />
      <span
        className={
          'absolute left-0 right-0 h-[2px] bg-ink rounded top-1/2 -translate-y-1/2 transition-opacity duration-200 ' +
          (open ? 'opacity-0' : 'opacity-100')
        }
      />
      <span
        className={
          'absolute left-0 right-0 h-[2px] bg-ink rounded transition-transform duration-300 ease-out ' +
          (open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0')
        }
      />
    </span>
  );
}
