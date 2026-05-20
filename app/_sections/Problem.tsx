/**
 * Section 2 — Problem.
 * Motion: none. Restraint after the hero reveal.
 * Layout: oversized statement on the left, single supporting paragraph
 * on the right. Matches Linear / Stripe rhythm of "give the eye a beat
 * between the hero and the first feature."
 */
export function Problem() {
  return (
    <section className="border-y border-rule bg-paperDeep/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-20 items-start">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          Owning a car is expensive and confusing.
          <span className="block text-slate2 mt-2">
            We didn&apos;t fix the cost. We made it less confusing.
          </span>
        </h2>

        <div className="md:pt-3">
          <p className="text-base md:text-lg text-slate2 leading-relaxed">
            Most car apps are a glorified spreadsheet, or a service-shop
            upsell, or a chatbot that hasn&apos;t seen your specific
            vehicle. CarFai reads your maintenance records, your OBD2
            scans, your country-specific costs — and answers questions
            about <em className="text-ink not-italic font-medium">your</em>{' '}
            car.
          </p>
        </div>
      </div>
    </section>
  );
}
