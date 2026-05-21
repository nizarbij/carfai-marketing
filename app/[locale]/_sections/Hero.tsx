// Server component — SplitTextReveal is its own 'use client' island,
// so this file can stay on the server and import node-only fs.
import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SplitTextReveal } from '../_components/SplitTextReveal';
import { StoreBadges } from '../_components/StoreBadges';
import { Button } from '../_components/Button';
import { SectionIndex } from '../_components/SectionIndex';

const HERO_IMAGE_EXISTS = existsSync(join(process.cwd(), 'public', 'hero.png'));

/**
 * Hero — stacked layout with the image as a full-bleed band below the
 * text. h1 sits at the original size scale (4xl → 7xl) rather than the
 * larger oversize we tried; the larger scale read as "design ambition"
 * over "easy to read." Founder direction: keep it the way it was.
 */
export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pt-20 md:pb-32">
        <SectionIndex number={1} label={t('eyebrow')} className="mb-8 md:mb-12" />

        <SplitTextReveal
          as="h1"
          onScroll={false}
          className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-ink max-w-4xl leading-[1.1] md:leading-[1.05]"
        >
          {t('h1')}
        </SplitTextReveal>

        <blockquote className="mt-8 md:mt-10 max-w-3xl">
          <p className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-ink leading-snug md:leading-[1.15] italic">
            <span aria-hidden className="text-accent not-italic">“</span>
            {t('quote')}
            <span aria-hidden className="text-accent not-italic">”</span>
          </p>
        </blockquote>

        <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
          {t('body')}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#start" variant="accent">{t('ctaStart')}</Button>
          <Button to="/pricing" variant="ghost" showArrow={false}>{t('ctaPricing')}</Button>
        </div>

        <div className="mt-8">
          <StoreBadges variant="pill" surface="light" />
        </div>

        {/* Image band — full width, sits below the text + CTAs. Mobile
            edge-to-edge (`-mx-6`) so the photo bleeds against the viewport
            on small screens; md+ gets a rounded corner inset. */}
        <div className="-mx-6 md:mx-0 mt-10 md:mt-20 relative aspect-[4/3] md:aspect-[16/9] md:rounded-2xl border border-rule bg-paperDeep overflow-hidden">
          {HERO_IMAGE_EXISTS ? (
            <Image
              src="/hero.png"
              alt={t('imageAlt')}
              fill
              priority
              sizes="(min-width: 1280px) 1100px, 95vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-mono text-base uppercase tracking-widest text-slate2">
                {t('imagePlaceholder')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
