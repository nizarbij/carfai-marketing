import Image from 'next/image';

/**
 * Shared phone-bezel frame. Previously inlined 7 times across sections
 * with slight bezel/shadow drift. One source of truth here keeps the
 * device look identical wherever a CarFai screenshot appears.
 *
 * `size`     "lg" (default) → 10px bezel, 30/60/-20 shadow, 2.5rem radius.
 *            "sm"           → 8px bezel,  20/40/-15 shadow, 2rem radius.
 *                             Used in Fleet cards where the frame sits
 *                             next to text rather than dominating.
 * `surface`  "light" → bg-ink bezel, dark shadow. Cream-paper sections.
 *            "dark"  → translucent bezel, deeper shadow. Dark-band sections
 *                     (Valuation). Keeps the device from disappearing.
 */
type Size    = 'lg' | 'sm';
type Surface = 'light' | 'dark';

interface Props {
  /** Single-image case. */
  src?:     string;
  /** Required when `src` is set. Ignored when `children` is rendering. */
  alt?:     string;
  /** Multi-layer case (e.g. crossfaded screenshots inside a pinned frame).
   *  When set, takes over the inner area; consumer is responsible for absolutes. */
  children?: React.ReactNode;
  /** Optional placeholder when neither `src` nor `children` is provided. */
  fallback?: React.ReactNode;
  size?:    Size;
  surface?: Surface;
  className?: string;
  /** sizes attr passed through to next/image (single-image case). */
  sizes?:   string;
}

const FRAME = {
  lg: {
    radius: 'rounded-[2.5rem]',
    bezel:  'border-[10px]',
    shadow: 'shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)]',
  },
  sm: {
    radius: 'rounded-[2rem]',
    bezel:  'border-[8px]',
    shadow: 'shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)]',
  },
};

export function PhoneFrame({
  src,
  alt,
  children,
  fallback,
  size = 'lg',
  surface = 'light',
  className = '',
  sizes = '(min-width: 768px) 320px, 80vw',
}: Props) {
  const f = FRAME[size];
  const bezelTone =
    surface === 'dark'
      ? 'border-paper/15 bg-paper/[0.04]'
      : 'border-ink bg-ink';

  return (
    <div
      className={`relative aspect-[9/19] overflow-hidden ${f.radius} ${f.bezel} ${bezelTone} ${f.shadow} ${className}`}
    >
      {children ? (
        children
      ) : src ? (
        <Image src={src} alt={alt ?? ''} fill sizes={sizes} className="phone-screen-img" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          {fallback}
        </div>
      )}
    </div>
  );
}
