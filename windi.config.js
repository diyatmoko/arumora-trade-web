import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['index.html', 'src/**/*.{jsx,tsx,js,ts}'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#04060A',
          soft: '#070B12',
        },
        surface: {
          DEFAULT: '#0A0F18',
          raised: '#0E1521',
          overlay: '#121B2B',
          hover: '#141E30',
        },
        line: {
          DEFAULT: 'rgba(148,163,184,0.10)',
          strong: 'rgba(148,163,184,0.20)',
        },
        content: {
          DEFAULT: '#E8EEF7',
          secondary: '#9AA9BD',
          muted: '#5D6C80',
          faint: '#3D4A5C',
        },
        accent: {
          DEFAULT: '#22D3EE',
          strong: '#7DEFFA',
          soft: 'rgba(34,211,238,0.12)',
          line: 'rgba(34,211,238,0.35)',
        },
        profit: {
          DEFAULT: '#22C55E',
          bright: '#4ADE80',
          dim: 'rgba(34,197,94,0.14)',
        },
        loss: {
          DEFAULT: '#EF4444',
          bright: '#F87171',
          dim: 'rgba(239,68,68,0.14)',
        },
        warn: {
          DEFAULT: '#F59E0B',
          dim: 'rgba(245,158,11,0.14)',
        },
        info: {
          DEFAULT: '#38BDF8',
          dim: 'rgba(56,189,248,0.14)',
        },
      },
      boxShadow: {
        card: '0 1px 0 rgba(148,163,184,0.06) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(34,211,238,0.25), 0 0 32px -8px rgba(34,211,238,0.35)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.num': {
          fontFeatureSettings: '"tnum" 1, "zero" 1',
          fontVariantNumeric: 'tabular-nums',
        },
      });
    },
  ],
});
