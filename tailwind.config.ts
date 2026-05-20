import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0B0E13',  // near-black for body text
        graphite: '#1C2230',
        slate2: '#3B475C',
        accent: '#3A6BFF',  // CarFai brand blue
        paper:  '#FAFAF7',  // warm off-white background
        rule:   '#E6E4DE',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
