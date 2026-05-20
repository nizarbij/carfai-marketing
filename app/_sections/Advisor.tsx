import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import { SplitTextReveal } from '../_components/SplitTextReveal';

const ADVISOR_IMAGE_EXISTS = existsSync(join(process.cwd(), 'public', 'app-aiadvisor.jpg'));

/**
 * Section 4 — AI Advisor.
 * Motion: splittext-reveal on the headline (scroll-triggered).
 * Static product screenshot underneath.
 */
export function Advisor() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-8">
          The advisor
        </p>

        <SplitTextReveal
          as="h2"
          className="text-4xl md:text-6xl font-medium tracking-tight text-ink max-w-3xl leading-[1.05]"
        >
          Ask your car anything.
        </SplitTextReveal>

        <p className="mt-8 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
          The advisor reads your service history, your OBD2 scans, your
          country, your model, your driving habits — and answers from
          your data first. Generic web answers second.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Quote-style sample exchanges */}
          <ul className="space-y-8 text-base md:text-lg">
            <li>
              <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-2">
                You
              </p>
              <p className="text-ink leading-relaxed">
                &ldquo;Why is my insurance higher than last year?&rdquo;
              </p>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                CarFai
              </p>
              <p className="text-slate2 leading-relaxed">
                Two reasons: your renewal cycle hit the post-3-year
                premium reset, and you added an at-fault claim in March.
                The benchmark for your model + age in Quebec is{' '}
                <span className="text-ink font-medium">$1,840/year</span>
                ; you&apos;re at $2,210. Shop now or wait six months for
                the claim to age into a lower bracket.
              </p>
            </li>
          </ul>

          {/* Phone-shaped frame; holds the real AIAdvisorScreen
              screenshot once /public/app-aiadvisor.jpg exists. */}
          <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-ink bg-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)]">
            {ADVISOR_IMAGE_EXISTS ? (
              <Image
                src="/app-aiadvisor.jpg"
                alt="CarFai AI Advisor screen showing a question and an answer."
                fill
                sizes="(min-width: 768px) 320px, 80vw"
                className="phone-screen-img"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center px-6 bg-paperDeep">
                <p className="font-mono text-xs uppercase tracking-widest text-slate2">
                  drop AIAdvisorScreen<br />
                  screenshot at<br />
                  /public/app-aiadvisor.jpg
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
