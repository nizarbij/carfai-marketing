'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { INSTALL_URLS } from '../_lib/install-urls';

/**
 * Apple App Store + Google Play badges. Two visual variants:
 *
 *   <StoreBadges variant="pill" />  → icon + label, side-by-side. For
 *                                     hero / inline CTAs.
 *   <StoreBadges variant="card" />  → icon + label + QR, two cards.
 *                                     For closing CTA / "download" sections.
 *
 * Live state is per-store now (was a single STORES_LIVE flag before
 * Play shipped on its own timeline ahead of iOS). A store with a
 * non-null URL in _lib/install-urls.ts renders as a clickable <a>;
 * one with null renders as a disabled <div> with a coming-soon caption.
 *
 * The "LAUNCHING SUMMER 2026" caption is shown ONLY when at least one
 * store is still not live. Once both are live it disappears.
 */

type Variant = 'pill' | 'card';
type Surface = 'light' | 'dark';

interface Props {
  variant?: Variant;
  surface?: Surface;
}

interface Store {
  key:   'apple' | 'google';
  icon:  string;
  qr:    string;
  href:  string | null;
}

const STORES: Store[] = [
  {
    key:  'apple',
    icon: '/store-apple.png',
    qr:   '/qr-apple.png',
    href: INSTALL_URLS.apple,
  },
  {
    key:  'google',
    icon: '/store-google.png',
    qr:   '/qr-google.png',
    href: INSTALL_URLS.google,
  },
];

const ALL_STORES_LIVE = STORES.every((s) => s.href !== null);

function useStoreCopy(s: Store) {
  const t = useTranslations('StoreBadges');
  const sub   = s.key === 'apple' ? t('appleSub')   : t('googleSub');
  const label = s.key === 'apple' ? t('appleLabel') : t('googleLabel');
  return { sub, label };
}

export function StoreBadges({ variant = 'pill', surface = 'light' }: Props) {
  // "LAUNCHING SUMMER 2026" caption removed — Play is live, and the
  // iOS-only "coming soon" state now reads better as just the dimmed/
  // aria-disabled Apple badge sitting next to the clickable Google one.
  // Kept ALL_STORES_LIVE around for potential future use (e.g. an
  // "install anywhere" hint once both stores ship).
  void ALL_STORES_LIVE;

  return variant === 'pill' ? <PillRow surface={surface} /> : <CardRow surface={surface} />;
}

/* ─── PILL variant ─────────────────────────────────────────────────────── */

function PillRow({ surface }: { surface: Surface }) {
  const dark = surface === 'dark';
  return (
    <div className="flex flex-wrap gap-3">
      {STORES.map((s) => <PillBadge key={s.key} store={s} dark={dark} />)}
    </div>
  );
}

function PillBadge({ store: s, dark }: { store: Store; dark: boolean }) {
  const { sub, label } = useStoreCopy(s);

  // Per-store liveness: if this store has no URL yet (e.g. iOS pre-approval),
  // render as a <div> with aria-disabled + reduced opacity. Once the URL is
  // populated in install-urls.ts, this same component becomes a real <a>.
  const isLive = s.href !== null;

  const inner = (
    <>
      <span className="relative h-7 w-7 shrink-0 rounded-md overflow-hidden">
        <Image src={s.icon} alt="" fill sizes="28px" className="object-contain" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={'text-[10px] uppercase tracking-widest ' + (dark ? 'text-paper/55' : 'text-slate2')}>
          {sub}
        </span>
        <span className={'text-sm font-semibold ' + (dark ? 'text-paper' : 'text-ink')}>
          {label}
        </span>
      </span>
    </>
  );

  const baseClass =
    'inline-flex items-center gap-3 ps-3 pe-5 py-2.5 rounded-full border ' +
    (dark ? 'bg-paper/[0.06] border-paper/15' : 'bg-paper border-rule');

  if (!isLive) {
    return (
      <div
        role="group"
        aria-disabled="true"
        aria-label={`${sub} ${label}`}
        className={baseClass + ' opacity-70 cursor-default select-none'}
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={s.href!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sub} ${label}`}
      className={baseClass + ' transition-colors ' + (dark ? 'hover:bg-paper/10' : 'hover:bg-paperDeep')}
    >
      {inner}
    </a>
  );
}

/* ─── CARD variant (with QR) ───────────────────────────────────────────── */

function CardRow({ surface }: { surface: Surface }) {
  const dark = surface === 'dark';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {STORES.map((s) => <CardBadge key={s.key} store={s} dark={dark} />)}
    </div>
  );
}

function CardBadge({ store: s, dark }: { store: Store; dark: boolean }) {
  const t = useTranslations('StoreBadges');
  const { sub, label } = useStoreCopy(s);
  const isLive = s.href !== null;

  const inner = (
    <>
      {isLive && (
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-paper p-1">
            <Image src={s.qr} alt={`${sub} ${label}`} fill sizes="96px" className="object-contain" />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="relative h-9 w-9 shrink-0 rounded-md overflow-hidden">
            <Image src={s.icon} alt="" fill sizes="36px" className="object-contain" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className={'text-[10px] uppercase tracking-widest ' + (dark ? 'text-paper/55' : 'text-slate2')}>
              {sub}
            </span>
            <span className={'text-base font-semibold ' + (dark ? 'text-paper' : 'text-ink')}>
              {label}
            </span>
          </span>
        </div>
        {isLive && (
          <p className={'text-xs ' + (dark ? 'text-paper/55' : 'text-slate2')}>
            {t('scanHint')}
          </p>
        )}
      </div>
    </>
  );

  const baseClass =
    'flex items-center gap-5 p-5 rounded-2xl border ' +
    (dark ? 'bg-paper/[0.04] border-paper/15' : 'bg-paper border-rule');

  if (!isLive) {
    return (
      <div
        role="group"
        aria-disabled="true"
        aria-label={`${sub} ${label}`}
        className={baseClass + ' opacity-70 cursor-default select-none'}
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={s.href!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sub} ${label}`}
      className={baseClass + ' transition-colors ' + (dark ? 'hover:bg-paper/[0.08]' : 'hover:bg-paperDeep')}
    >
      {inner}
    </a>
  );
}
