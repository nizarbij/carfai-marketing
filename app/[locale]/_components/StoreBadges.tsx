'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

/**
 * Apple App Store + Google Play badges. Two visual variants:
 *
 *   <StoreBadges variant="pill" />  → icon + label, side-by-side. For
 *                                     hero / inline CTAs.
 *   <StoreBadges variant="card" />  → icon + label + QR, two cards.
 *                                     For closing CTA / "download" sections.
 *
 * STORES_LIVE flips the badges between two states:
 *   false → visual-only, no href, no QR; "LAUNCHING SUMMER 2026" caption shown.
 *   true  → real links + QR codes; caption hidden.
 *
 * Set to true on the day Apple + Play listings go live (see RELEASE_PLAN H5).
 * All labels are translated via the StoreBadges namespace.
 */

const STORES_LIVE = false;

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
  href:  string;
}

const STORES: Store[] = [
  {
    key:  'apple',
    icon: '/store-apple.png',
    qr:   '/qr-apple.png',
    href: 'https://apps.apple.com/app/carfai/id0000000000',
  },
  {
    key:  'google',
    icon: '/store-google.png',
    qr:   '/qr-google.png',
    href: 'https://play.google.com/store/apps/details?id=com.carfai.app',
  },
];

function useStoreCopy(s: Store) {
  const t = useTranslations('StoreBadges');
  const sub   = s.key === 'apple' ? t('appleSub')   : t('googleSub');
  const label = s.key === 'apple' ? t('appleLabel') : t('googleLabel');
  return { sub, label };
}

export function StoreBadges({ variant = 'pill', surface = 'light' }: Props) {
  const t = useTranslations('StoreBadges');
  const dark = surface === 'dark';

  return (
    <div className="space-y-3">
      {variant === 'pill' ? <PillRow surface={surface} /> : <CardRow surface={surface} />}
      {!STORES_LIVE && (
        <p
          className={
            'text-[11px] font-mono uppercase tracking-widest text-start ' +
            (dark ? 'text-paper/55' : 'text-slate2')
          }
        >
          {t('launchingCaption')}
        </p>
      )}
    </div>
  );
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

  // Shared visual chrome. When STORES_LIVE is false we render a <div> with
  // aria-disabled rather than an <a> with a stale href — keeps the design
  // intact, avoids dead clicks and screen-reader confusion.
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

  if (!STORES_LIVE) {
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
      href={s.href}
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

  const inner = (
    <>
      {STORES_LIVE && (
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
        {STORES_LIVE && (
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

  if (!STORES_LIVE) {
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
      href={s.href}
      aria-label={`${sub} ${label}`}
      className={baseClass + ' transition-colors ' + (dark ? 'hover:bg-paper/[0.08]' : 'hover:bg-paperDeep')}
    >
      {inner}
    </a>
  );
}
