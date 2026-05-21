/**
 * Editorial eyebrow / kicker. Mono uppercase tracked label that sits
 * above section heads. Centralised so we can adjust the system once
 * if it starts reading as scaffolding (brand-register warning) rather
 * than as deliberate voice.
 *
 * `tone`  "muted"  (default) → slate2. Section grammar.
 *         "accent"            → teal. Used inside a section to mark a
 *                              specific moment (per-step labels, answer
 *                              labels in Advisor, etc.) — never as the
 *                              top-of-section label.
 *         "onDark"            → paper/50 over dark bands.
 * `size`  "sm" (sm:text-xs)  → eyebrow rhythm inside a step/card.
 *         "md" (default)     → top-of-section eyebrow.
 */
type Tone = 'muted' | 'accent' | 'onDark';
type Size = 'sm' | 'md';

interface Props {
  children: React.ReactNode;
  tone?:    Tone;
  size?:    Size;
  className?: string;
}

const TONE = {
  muted:  'text-slate2',
  accent: 'text-accent',
  onDark: 'text-paper/50',
};

const SIZE = {
  sm: 'text-xs sm:text-sm',
  md: 'text-sm md:text-base',
};

export function Eyebrow({ children, tone = 'muted', size = 'md', className = '' }: Props) {
  return (
    <p
      className={`font-mono ${SIZE[size]} uppercase tracking-widest ${TONE[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
