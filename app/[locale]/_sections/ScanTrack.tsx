'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PhoneFrame } from '../_components/PhoneFrame';
import { Eyebrow } from '../_components/Eyebrow';
import { SectionIndex } from '../_components/SectionIndex';
import { useReducedMotion } from '../_components/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = ['/app-scan-extract.jpg', '/app-documents.jpg', '/app-analytics-spending.jpg'];

export function ScanTrack() {
  const t          = useTranslations('ScanTrack');
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs   = useRef<HTMLDivElement[]>([]);
  const screenRefs = useRef<HTMLDivElement[]>([]);
  const reduced    = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const steps = stepRefs.current;
        const screens = screenRefs.current;
        if (steps.length === 0 || screens.length === 0) return;

        gsap.set(steps.slice(1),   { opacity: 0, y: 24 });
        gsap.set(screens.slice(1), { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:  sectionRef.current,
            start:    'top top',
            end:      '+=150%',
            scrub:    0.6,
            pin:      true,
            anticipatePin: 1,
          },
        });

        tl.to(steps[0], { opacity: 0, y: -24, duration: 1 }, 0)
          .to(steps[1], { opacity: 1, y: 0,   duration: 1 }, 0)
          .to(steps[1], { opacity: 0, y: -24, duration: 1 }, 1.2)
          .to(steps[2], { opacity: 1, y: 0,   duration: 1 }, 1.2);

        tl.to(screens[0], { opacity: 0, duration: 1 }, 0)
          .to(screens[1], { opacity: 1, duration: 1 }, 0)
          .to(screens[1], { opacity: 0, duration: 1 }, 1.2)
          .to(screens[2], { opacity: 1, duration: 1 }, 1.2);
      });
    },
    { scope: sectionRef },
  );

  const steps = [
    { eyebrow: t('step1Eyebrow'), title: t('step1Title'), body: t('step1Body'), image: IMAGES[0], alt: t('step1Alt') },
    { eyebrow: t('step2Eyebrow'), title: t('step2Title'), body: t('step2Body'), image: IMAGES[1], alt: t('step2Alt') },
    { eyebrow: t('step3Eyebrow'), title: t('step3Title'), body: t('step3Body'), image: IMAGES[2], alt: t('step3Alt') },
  ];

  return (
    <section ref={sectionRef} className="relative md:h-screen md:overflow-hidden">
      {/* Mobile: native swipe carousel */}
      <div className="md:hidden py-16">
        <div className="px-6 mb-8">
          <SectionIndex number={3} label={t('mobileEyebrow')} />
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-ps-6 px-6 pb-6 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((s, i) => (
            <article key={i} className="shrink-0 w-[82vw] snap-start space-y-6">
              <PhoneFrame src={s.image} alt={s.alt} sizes="280px" className="w-full max-w-[280px] mx-auto" />
              <div>
                <Eyebrow tone="accent" size="sm" className="mb-2">{s.eyebrow}</Eyebrow>
                <h3 className="text-2xl font-medium tracking-tight text-ink leading-[1.15] mb-3">{s.title}</h3>
                <p className="text-base text-slate2 leading-relaxed">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="px-6 mt-4 text-xs text-slate2 font-mono">{t('swipeHint')}</p>
      </div>

      {/* Desktop: pinned-scrub */}
      <div className="hidden md:grid mx-auto max-w-6xl px-6 h-full md:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <div className="relative h-80">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) stepRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <Eyebrow tone="accent" className="mb-4">{s.eyebrow}</Eyebrow>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-ink leading-[1.1] mb-4">{s.title}</h3>
              <p className="text-lg md:text-xl text-slate2 leading-relaxed max-w-prose">{s.body}</p>
            </div>
          ))}
        </div>

        <PhoneFrame className="max-h-[78vh] mx-auto w-full max-w-xs">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) screenRefs.current[i] = el; }}
              className="absolute inset-0"
            >
              <Image src={s.image} alt={s.alt} fill sizes="320px" className="phone-screen-img" />
            </div>
          ))}
        </PhoneFrame>
      </div>
    </section>
  );
}
