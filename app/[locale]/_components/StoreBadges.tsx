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
 * All labels are translated via the StoreBadges namespace.
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
  if (variant === 'pill') return <PillRow surface={surface} />;
  return <CardRow surface={surface} />;
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
  return (
    <a
      href={s.href}
      aria-label={`${sub} ${label}`}
      className={
        'group inline-flex items-center gap-3 ps-3 pe-5 py-2.5 rounded-full border transition-colors ' +
        (dark
          ? 'bg-paper/[0.06] border-paper/15 hover:bg-paper/10'
          : 'bg-paper border-rule hover:bg-paperDeep')
      }
    >
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
  return (
    <a
      href={s.href}
      aria-label={`${sub} ${label}`}
      className={
        'group flex items-center gap-5 p-5 rounded-2xl border transition-colors ' +
        (dark
          ? 'bg-paper/[0.04] border-paper/15 hover:bg-paper/[0.08]'
          : 'bg-paper border-rule hover:bg-paperDeep')
      }
    >
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-paper p-1">
          <Image src={s.qr} alt={`${sub} ${label}`} fill sizes="96px" className="object-contain" />
        </div>
      </div>

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
        <p className={'text-xs ' + (dark ? 'text-paper/55' : 'text-slate2')}>
          {t('scanHint')}
        </p>
      </div>
    </a>
  );
}
