import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Contact',
  description: 'Get in touch with CarFai — questions, feedback, partnership, or just to say hi.',
};

const CONTACT_EMAIL = 'carfai.info@gmail.com';

const reasons = [
  {
    eyebrow: 'general',
    title:   'Got a question, idea, or just want to say hi?',
    body:    'We read every message. Replies usually within one business day.',
    cta:     'Email us',
    href:    `mailto:${CONTACT_EMAIL}`,
  },
  {
    eyebrow: 'support',
    title:   'Something broken or confusing in the app?',
    body:    'Tell us what happened, what device you were on, and what you expected. The more detail the faster we can help.',
    cta:     'Get help',
    href:    `mailto:${CONTACT_EMAIL}?subject=Support%20request`,
  },
  {
    eyebrow: 'business · fleets · partnerships',
    title:   'Talking about fleet pricing, integrations, or a partnership?',
    body:    'B2B onboarding for organizations up to 200 vehicles is live; enterprise pricing is custom. Tell us about your operation.',
    cta:     'Talk business',
    href:    `mailto:${CONTACT_EMAIL}?subject=Business%20enquiry`,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-6">
          Contact
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
          Reach a human.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 leading-relaxed">
          CarFai is a small operation. The same person who shipped the
          feature also reads the inbox. Email is the fastest path.
        </p>
      </section>

      {/* ── Email card (the canonical CTA, repeated up top so people who
              scroll-bounce see it before the breakdown below) ── */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="block rounded-3xl border border-rule bg-paper hover:bg-paperDeep transition-colors px-8 py-10 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-3">
            Direct email
          </p>
          <p className="text-2xl md:text-3xl font-medium text-accent break-all">
            {CONTACT_EMAIL}
          </p>
          <p className="mt-4 text-sm text-slate2">
            Tap to open in your mail app.
          </p>
        </a>
      </section>

      {/* ── Reason cards (3) ── */}
      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32 space-y-6">
        {reasons.map((r) => (
          <article
            key={r.eyebrow}
            className="rounded-3xl border border-rule bg-paperDeep/40 p-6 md:p-10"
          >
            <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent mb-3">
              {r.eyebrow}
            </p>
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink leading-snug mb-3">
              {r.title}
            </h2>
            <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose mb-6">
              {r.body}
            </p>
            <a
              href={r.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper hover:bg-accentDeep transition-colors font-medium text-sm"
            >
              {r.cta} →
            </a>
          </article>
        ))}
      </section>

      {/* ── Footer note: response time + jurisdiction ── */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-sm text-slate2 leading-relaxed">
        <p>
          We answer in English and French. Operating hours roughly
          09:00–18:00 Eastern Time, Monday through Friday. Security or
          privacy concerns get prioritised — mention them in your subject
          line.
        </p>
      </section>
    </>
  );
}
