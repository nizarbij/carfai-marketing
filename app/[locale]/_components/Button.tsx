import { Link } from '@/i18n/navigation';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Editorial pill button used across the landing.
 *
 * Variants
 *   "accent" → teal fill (primary CTA, "Start free")
 *   "ink"    → ink fill (secondary CTA, store-row "Get it free")
 *   "ghost"  → text-only with hover colour shift (tertiary "See pricing")
 *
 * Size
 *   "md" (default) — section CTAs
 *   "lg"           — hero / closing CTA
 *
 * Arrow flips automatically in RTL via the `arrow-rtl-flip` class
 * declared in globals.css. Pass `showArrow={false}` to opt out.
 */
type Variant = 'accent' | 'ink' | 'ghost';
type Size    = 'md' | 'lg';

const VARIANT = {
  accent: 'bg-accent text-paper hover:bg-accentDeep',
  ink:    'bg-ink text-paper hover:bg-accentDeep',
  ghost:  'text-ink hover:text-accentDeep',
};

const SIZE = {
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-base md:text-lg',
};

interface BaseProps {
  variant?:   Variant;
  size?:      Size;
  showArrow?: boolean;
  children:   React.ReactNode;
  className?: string;
}

type ButtonAnchorProps = BaseProps & { href: string; locale?: never } & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps | 'href'>;
type ButtonLinkProps   = BaseProps & { to:   string; locale?: never } & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps | 'href'>;

type Props = ButtonAnchorProps | ButtonLinkProps;

function isLink(p: Props): p is ButtonLinkProps {
  return 'to' in p;
}

export function Button(props: Props) {
  const {
    variant = 'accent',
    size = 'md',
    showArrow = true,
    children,
    className = '',
    ...rest
  } = props;

  const classes =
    `inline-flex items-center gap-2 rounded-full font-medium transition-colors ${VARIANT[variant]} ${SIZE[size]} ${className}`;

  const inner = (
    <>
      {children}
      {showArrow && <span aria-hidden className="arrow-rtl-flip">→</span>}
    </>
  );

  if (isLink(props)) {
    // Strip `to` from rest by re-destructuring; `to` is not a valid <a> attr.
    const { to, ...anchorRest } = rest as ButtonLinkProps;
    return (
      <Link href={to} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  return (
    <a className={classes} {...(rest as Omit<ButtonAnchorProps, keyof BaseProps>)}>
      {inner}
    </a>
  );
}
