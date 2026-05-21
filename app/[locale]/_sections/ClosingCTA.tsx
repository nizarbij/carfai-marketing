'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitTextReveal } from '../_components/SplitTextReveal';
import { StoreBadges } from '../_components/StoreBadges';

/**
 * Section 9 — Closing CTA. Patterns: splittext-reveal heading +
 * magnetic-cursor on the primary button. Store-badge cards below.
 */
export function ClosingCTA() {
  const t = useTranslations('ClosingCTA');
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (context) => {
      const btn = btnRef.current;
      if (!btn) return;

      function onMove(e: MouseEvent) {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 160;

        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.4;
          gsap.to(btn, { x: dx * pull, y: dy * pull, duration: 0.35, ease: 'power3.out' });
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        }
      }

      window.addEventListener('mousemove', onMove);
      context.add(() => window.removeEventListener('mousemove', onMove));
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-t border-rule bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-32 md:py-48 text-center">
        <p className="font-mono text-base uppercase tracking-widest text-paper/50 mb-8">
          {t('eyebrow')}
        </p>

        <SplitTextReveal
          as="h2"
          className="text-4xl md:text-7xl font-medium tracking-tight max-w-4xl mx-auto leading-[1.05]"
        >
          {t('h2')}
        </SplitTextReveal>

        <p className="mt-8 text-lg md:text-xl text-paper/60 max-w-prose mx-auto leading-relaxed">
          {t('body')}
        </p>

        <div className="mt-12 inline-block">
          <a
            ref={btnRef}
            href="#"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-white hover:bg-accentDeep transition-colors font-medium text-base md:text-lg will-change-transform"
          >
            {t('ctaButton')}
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-16">
          <StoreBadges variant="card" surface="dark" />
        </div>
      </div>
    </section>
  );
}
