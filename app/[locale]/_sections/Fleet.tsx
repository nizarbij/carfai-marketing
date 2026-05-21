'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = ['/app-fleet-home.jpg', '/app-fleet-overview.jpg', '/app-fleet-analytics.jpg'];

export function Fleet() {
  const t          = useTranslations('Fleet');
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.scrollWidth - track.clientWidth;
        if (distance <= 0) return;

        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger:  sectionRef.current,
            start:    'top top',
            end:      () => `+=${distance + 200}`,
            scrub:    0.5,
            pin:      true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  const cards = [
    { image: IMAGES[0], eyebrow: t('card1Eyebrow'), title: t('card1Title'), body: t('card1Body'), alt: t('card1Alt') },
    { image: IMAGES[1], eyebrow: t('card2Eyebrow'), title: t('card2Title'), body: t('card2Body'), alt: t('card2Alt') },
    { image: IMAGES[2], eyebrow: t('card3Eyebrow'), title: t('card3Title'), body: t('card3Body'), alt: t('card3Alt') },
  ];

  return (
    <section ref={sectionRef} className="relative bg-paperDeep md:h-screen md:overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-20">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-4">
          {t('eyebrow')}
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-2xl leading-[1.1]">
          {t('h2')}
        </h2>
      </div>

      {/* Mobile: native swipe carousel */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 px-6 pb-12 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((c, i) => (
          <article key={i} className="shrink-0 w-[85vw] snap-start rounded-3xl border border-rule bg-paper p-6 flex flex-col gap-5">
            <div className="relative aspect-[9/19] w-full max-w-[200px] mx-auto rounded-[1.75rem] border-[8px] border-ink bg-ink overflow-hidden shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)]">
              <Image src={c.image} alt={c.alt} fill sizes="200px" className="phone-screen-img" />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-accent mb-2">
                {String(i + 1).padStart(2, '0')} · {c.eyebrow}
              </p>
              <h3 className="text-xl font-medium tracking-tight text-ink leading-tight mb-2">{c.title}</h3>
              <p className="text-base text-slate2 leading-relaxed">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="md:hidden px-6 pb-12 -mt-6 text-xs text-slate2 font-mono">{t('swipeHint')}</p>

      {/* Desktop: GSAP horizontal-on-vertical pin */}
      <div className="hidden md:block overflow-hidden">
        <div ref={trackRef} className="flex gap-8 px-[max(1.5rem,calc((100vw-72rem)/2))] will-change-transform items-stretch">
          {cards.map((c, i) => (
            <article key={i} className="shrink-0 w-[42rem] rounded-3xl border border-rule bg-paper p-10 grid grid-cols-[auto_1fr] gap-8 items-center">
              <div className="relative aspect-[9/19] w-[200px] rounded-[2rem] border-[8px] border-ink bg-ink overflow-hidden shadow-[0_20px_40px_-15px_rgba(11,14,19,0.35)] mx-auto">
                <Image src={c.image} alt={c.alt} fill sizes="200px" className="phone-screen-img" />
              </div>
              <div>
                <p className="font-mono text-base uppercase tracking-widest text-accent mb-3">
                  {String(i + 1).padStart(2, '0')} · {c.eyebrow}
                </p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink leading-tight mb-3">{c.title}</h3>
                <p className="text-lg text-slate2 leading-relaxed">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
