import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';

// Section 4 — Maintenance, OBD2, document expiry.
// Pattern: editorial split — real app screenshot on the left,
// three concise feature bullets on the right. Static motion, since
// the section sits between the pinned ScanTrack and the
// horizontal-on-vertical Fleet later — too much motion compounding.

// Visual leans on the OBD2 dashboard since OBD2 is the section's
// most differentiating capability (fault codes + live readings).
// The maintenance/calendar story stays in the bullet copy.
const OBD2_IMAGE_EXISTS = existsSync(
  join(process.cwd(), 'public', 'app-obd2.jpg'),
);

const bullets = [
  {
    eyebrow: 'AI maintenance calendar',
    body:    'CarFai reads every service record, owner manual interval, and the way you actually drive — then schedules each upcoming service to a real date, not a vague "every 6 months".',
  },
  {
    eyebrow: 'OBD2 diagnostics',
    body:    'Plug in any OBD2 adapter. Live engine, transmission, battery, and fuel-system data — interpreted in plain language, not in P-codes you have to Google.',
  },
  {
    eyebrow: 'Document expiry tracking',
    body:    'Insurance renewal, registration, inspection. Scanned from your receipts once, surfaced on the calendar forever. No more missed-renewal late fees.',
  },
];

export function Maintenance() {
  return (
    <section className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        {/* Left: phone-shaped frame with the maintenance screen */}
        <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-ink bg-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)] order-2 md:order-1">
          {OBD2_IMAGE_EXISTS ? (
            <Image
              src="/app-obd2.jpg"
              alt="CarFai OBD2 dashboard: 2 fault codes (P0000 info, P0043 warning), key readings (battery 13.1 V, coolant 63 °C, odometer 65,415 km), and a 30-day drive summary."
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6 bg-paperDeep">
              <p className="font-mono text-xs uppercase tracking-widest text-slate2">
                missing<br />/public/app-obd2.jpg
              </p>
            </div>
          )}
        </div>

        {/* Right: copy + 3 bullets */}
        <div className="order-1 md:order-2">
          <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-6">
            Maintenance · OBD2 · Renewals
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink leading-[1.1] max-w-xl">
            Everything that breaks down — predicted, not surprised.
          </h2>

          <ul className="mt-10 space-y-8">
            {bullets.map((b) => (
              <li key={b.eyebrow}>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                  {b.eyebrow}
                </p>
                <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
