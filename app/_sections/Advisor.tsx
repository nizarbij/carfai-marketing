import { SplitTextReveal } from '../_components/SplitTextReveal';

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

          {/* App screenshot slot */}
          <div className="aspect-[9/16] max-h-[78vh] rounded-3xl border border-rule bg-paperDeep flex items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-widest text-slate2 text-center px-6">
              app screenshot slot<br />
              (aiAdvisorScreen — chat thread)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
