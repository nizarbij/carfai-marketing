import Image from 'next/image';

/**
 * Apple App Store + Google Play badges. Two visual variants:
 *
 *   <StoreBadges variant="pill" />  → icon + label, side-by-side. For
 *                                     hero / inline CTAs.
 *   <StoreBadges variant="card" />  → icon + label + QR, two cards.
 *                                     For closing CTA / "download" sections.
 *
 * Logos: /public/store-apple.png + /public/store-google.jpg
 * QRs:   /public/qr-apple.png + /public/qr-google.png
 *        (regenerate via `npm run gen:qr` when real store URLs land)
 *
 * Tone control via the `surface` prop:
 *   - 'light' (default) for the cream paper background
 *   - 'dark' for the ink (#0B0E13) ClosingCTA background
 */

type Variant = 'pill' | 'card';
type Surface = 'light' | 'dark';

interface Props {
  variant?: Variant;
  surface?: Surface;
}

const STORES = [
  {
    key:   'apple',
    label: 'App Store',
    sub:   'Download on the',
    icon:  '/store-apple.png',
    qr:    '/qr-apple.png',
    href:  'https://apps.apple.com/app/carfai/id0000000000',
  },
  {
    key:   'google',
    label: 'Google Play',
    sub:   'Get it on',
    icon:  '/store-google.jpg',
    qr:    '/qr-google.png',
    href:  'https://play.google.com/store/apps/details?id=com.carfai.app',
  },
] as const;

export function StoreBadges({ variant = 'pill', surface = 'light' }: Props) {
  if (variant === 'pill') return <PillRow surface={surface} />;
  return <CardRow surface={surface} />;
}

/* ─── PILL variant ─────────────────────────────────────────────────────── */

function PillRow({ surface }: { surface: Surface }) {
  const dark = surface === 'dark';
  return (
    <div className="flex flex-wrap gap-3">
      {STORES.map((s) => (
        <a
          key={s.key}
          href={s.href}
          aria-label={`${s.sub} ${s.label}`}
          className={
            'group inline-flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border transition-colors ' +
            (dark
              ? 'bg-paper/[0.06] border-paper/15 hover:bg-paper/10'
              : 'bg-paper border-rule hover:bg-paperDeep')
          }
        >
          <span className="relative h-7 w-7 shrink-0 rounded-md overflow-hidden">
            <Image
              src={s.icon}
              alt=""
              fill
              sizes="28px"
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className={'text-[10px] uppercase tracking-widest ' + (dark ? 'text-paper/55' : 'text-slate2')}>
              {s.sub}
            </span>
            <span className={'text-sm font-semibold ' + (dark ? 'text-paper' : 'text-ink')}>
              {s.label}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

/* ─── CARD variant (with QR) ───────────────────────────────────────────── */

function CardRow({ surface }: { surface: Surface }) {
  const dark = surface === 'dark';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {STORES.map((s) => (
        <a
          key={s.key}
          href={s.href}
          aria-label={`${s.sub} ${s.label}`}
          className={
            'group flex items-center gap-5 p-5 rounded-2xl border transition-colors ' +
            (dark
              ? 'bg-paper/[0.04] border-paper/15 hover:bg-paper/[0.08]'
              : 'bg-paper border-rule hover:bg-paperDeep')
          }
        >
          {/* QR + icon stacked */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-paper p-1">
              <Image
                src={s.qr}
                alt={`Scan to download from ${s.label}`}
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="relative h-9 w-9 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={s.icon}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className={'text-[10px] uppercase tracking-widest ' + (dark ? 'text-paper/55' : 'text-slate2')}>
                  {s.sub}
                </span>
                <span className={'text-base font-semibold ' + (dark ? 'text-paper' : 'text-ink')}>
                  {s.label}
                </span>
              </span>
            </div>
            <p className={'text-xs ' + (dark ? 'text-paper/55' : 'text-slate2')}>
              Scan the QR or tap to open.
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
