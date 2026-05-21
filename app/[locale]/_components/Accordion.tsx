'use client';

import * as RA from '@radix-ui/react-accordion';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Token-skinned Radix accordion. Single-question-open mode by default
 * (`type="single" collapsible`), keyboard-navigable + ARIA-compliant
 * for free.
 *
 * Used on /pricing for the FAQ. Skins:
 *   - hairline rule between items (no boxed cards — matches editorial
 *     restraint, not the shadcn-default card-wrapped accordion).
 *   - question text inherits ink; turns accent on open via data-state.
 *   - chevron rotates 180° on open. CSS-only, no JS for the icon.
 *   - content height transitions via Radix's CSS variable
 *     `--radix-accordion-content-height` against `grid-template-rows`
 *     — the cleanest way to animate dynamic content height without
 *     `max-height` magic numbers.
 */

export const Accordion = RA.Root;

export function AccordionItem({
  className = '',
  ...props
}: ComponentPropsWithoutRef<typeof RA.Item>) {
  return (
    <RA.Item
      className={`border-t border-rule first:border-t-0 ${className}`}
      {...props}
    />
  );
}

export function AccordionTrigger({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<typeof RA.Trigger>) {
  return (
    <RA.Header className="flex">
      <RA.Trigger
        className={`group flex flex-1 items-center justify-between gap-6 py-6 md:py-7 text-start text-lg md:text-xl font-medium leading-snug text-ink data-[state=open]:text-accentDeep transition-colors hover:text-accentDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm ${className}`}
        {...props}
      >
        {children}
        <Chevron />
      </RA.Trigger>
    </RA.Header>
  );
}

export function AccordionContent({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<typeof RA.Content>) {
  return (
    <RA.Content
      className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      {...props}
    >
      <div className={`pb-6 md:pb-8 pe-10 text-base md:text-lg text-slate2 leading-relaxed ${className}`}>
        {children}
      </div>
    </RA.Content>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-slate2 group-data-[state=open]:text-accent group-data-[state=open]:rotate-180 transition-transform duration-300 ease-out"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
