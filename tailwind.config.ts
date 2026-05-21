import type { Config } from 'tailwindcss';

/**
 * Source of truth: docs/DESIGN_TOKENS.md
 * Brand teal + navy come from carfai-app-mobile/theme/colors.ts (light theme).
 * Never use #000000 or #FFFFFF — see DESIGN_TOKENS.md "Palette" section.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface
        paper:     '#FAFAF7',  // page background — warm cream, NOT #FFFFFF
        paperDeep: '#F2EFE8',  // section-band background tint
        rule:      '#E6E4DE',  // hairline dividers

        // Text
        ink:      '#0B0E13',   // body text — warm near-black, NOT #000000
        graphite: '#1C2230',   // section heads when quieter than ink
        slate2:   '#3B475C',   // subtitles · footer · muted body

        // Brand (locked from mobile app logo)
        accent:     '#089BC3',  // primary teal — CTAs, links, stat highlights
        accentDeep: '#0A3E8F',  // navy — primary hover, footer accent
        accentMist: '#E0F4FA',  // tinted callout backgrounds

        // Reserved (sparingly)
        signal:   '#10B981',
        warn:     '#F59E0B',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
      letterSpacing: {
        widest: '0.22em',  // for eyebrow / small-caps labels
      },
      keyframes: {
        // Radix Accordion. Animates against the dynamic content height
        // exposed by Radix as --radix-accordion-content-height.
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up':   'accordion-up   220ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
