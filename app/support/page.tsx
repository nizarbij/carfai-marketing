import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:       'Support',
  description: 'CarFai help — common questions, account and billing, OBD2 troubleshooting, privacy. Plus a direct line to email support.',
};

const CONTACT_EMAIL = 'carfai.info@gmail.com';

interface QA { q: string; a: string }
interface Section { heading: string; items: QA[] }

const sections: Section[] = [
  {
    heading: 'Account & billing',
    items: [
      {
        q: 'How do I cancel my subscription?',
        a: 'Open the App Store (iOS) or Google Play (Android) on the device you subscribed from, find CarFai in your subscriptions, and tap Cancel. CarFai itself cannot cancel subscriptions on your behalf — that flow is owned entirely by Apple / Google.',
      },
      {
        q: 'How do I get a refund?',
        a: 'Refund requests go through the App Store or Google Play, not through CarFai. On iOS: reportaproblem.apple.com. On Android: Google Play → Order History → Report a problem. We will support your refund request if you let us know — email us with the date of purchase and your account email.',
      },
      {
        q: 'I switched tiers. When does it take effect?',
        a: 'Upgrades take effect immediately. Downgrades take effect at the end of the current billing period — you keep the higher tier’s features until then. Token balances on paid tiers carry forward.',
      },
      {
        q: 'I deleted my account by accident.',
        a: 'Account deletion is permanent and immediate — we do not keep a recovery window. If you deleted within the last 30 days, email us with your old account email and we will check whether any encrypted snapshot can be restored. No guarantees.',
      },
    ],
  },
  {
    heading: 'AI Advisor & analysis',
    items: [
      {
        q: 'Why does the Advisor say "I don\'t have enough data"?',
        a: 'The Advisor refuses to invent numbers. If you have not scanned receipts yet, or your vehicle has fewer than 3 community comparables, some answers will say so explicitly. Scan a few receipts and the Advisor will start drawing from your data first.',
      },
      {
        q: 'How accurate is the vehicle valuation?',
        a: 'The valuation shows a confidence band based on how many comparable listings and community records back the estimate. "Low" confidence usually means we found fewer than 3 comparables in your region. As more drivers in your country / model / trim use CarFai, confidence improves.',
      },
      {
        q: 'Can the Advisor get things wrong?',
        a: 'Yes. AI outputs are flagged as AI-generated in-app and should be treated as a second opinion, not gospel. For anything safety-critical (brake faults, engine warnings) consult a qualified mechanic. See our AI Disclosure for details.',
      },
    ],
  },
  {
    heading: 'OBD2 scanner',
    items: [
      {
        q: 'Which OBD2 adapter should I buy?',
        a: 'Any Bluetooth 4.0+ adapter that supports the ELM327 protocol works. We have tested Veepeak, Vgate iCar, and OBDLink MX+ on both iOS and Android. Avoid Wi-Fi-only adapters — iOS does not allow third-party apps to use Wi-Fi OBD2 dongles.',
      },
      {
        q: 'My adapter pairs in Bluetooth settings but CarFai can\'t see it.',
        a: 'In CarFai, do NOT pair the adapter through your phone\'s system Bluetooth menu first. Open CarFai → OBD2 → Scan and let CarFai pair it directly. If it was already paired in system settings, "Forget" it there and try again from inside CarFai.',
      },
      {
        q: 'I see fault codes I don\'t recognize.',
        a: 'Tap any fault code in the OBD2 dashboard for a plain-language explanation. Codes flagged with the orange WARNING badge are emissions-related; INFO codes are typically not safety-critical.',
      },
    ],
  },
  {
    heading: 'Privacy & data',
    items: [
      {
        q: 'How do I export everything you have on me?',
        a: 'In-app: Settings → Privacy → Export my data. We send a ZIP to your registered email within 7 days. The export covers vehicles, documents, OBD2 history, AI Advisor conversations, and subscription metadata.',
      },
      {
        q: 'How do I delete everything?',
        a: 'In-app: Settings → Privacy → Delete account. Action is immediate and permanent.',
      },
      {
        q: 'Who do you share my data with?',
        a: (
          'We never sell your data. We share it only with sub-processors strictly necessary to provide the service. The full list is in our '
        ),
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-6">
          Support
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
          Quick answers.<br />
          And a real person when you need one.
        </h1>
      </section>

      {/* ── Direct email banner ── */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-3xl border border-rule bg-paper p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-1">
              Email support
            </p>
            <p className="text-lg md:text-xl text-ink font-medium break-all">
              {CONTACT_EMAIL}
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Support%20request`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white hover:bg-accentDeep transition-colors font-medium text-sm"
          >
            Open in mail app →
          </a>
        </div>
        <p className="mt-3 text-xs text-slate2 leading-relaxed">
          Usual response time: within one business day. Security and privacy
          concerns get bumped to the front of the queue — mention them in your
          subject line.
        </p>
      </section>

      {/* ── FAQ sections ── */}
      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32 space-y-16">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-6">
              {s.heading}
            </h2>
            <dl className="space-y-8">
              {s.items.map((qa) => (
                <div key={qa.q}>
                  <dt className="text-lg md:text-xl font-medium text-ink mb-3 leading-snug">
                    {qa.q}
                  </dt>
                  <dd className="text-base md:text-lg text-slate2 leading-relaxed">
                    {qa.a}
                    {qa.q.startsWith('Who do you share') && (
                      <>
                        <Link href="/privacy" className="text-accent underline underline-offset-2 hover:no-underline">
                          Privacy Policy
                        </Link>
                        .
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      {/* ── Footer note: status page placeholder ── */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-sm text-slate2 leading-relaxed border-t border-rule pt-10">
        <p>
          <strong className="text-ink">System status:</strong> live status
          page coming with v1.1. In the meantime, if you suspect an
          outage, email us — we will tell you what we know.
        </p>
      </section>
    </>
  );
}
