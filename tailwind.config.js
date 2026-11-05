/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' }, screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        brand: { green: '#22C55E', emerald: '#10B981', cyan: '#06B6D4' },
        ink: { DEFAULT: '#17191C', 900: '#17191C', 800: '#1F2226', 700: '#2A2E33', 600: '#3A3F45' },
        paper: { DEFAULT: '#FFFFFF', off: '#F8FAF9', grey: '#F1F3F2' },
        line: { DEFAULT: '#E5E7EB', dark: '#2C3136' },
        muted: { DEFAULT: '#737A80', dark: '#9AA1A7' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, #22C55E 0%, #10B981 48%, #06B6D4 100%)',
      },
      letterSpacing: { tightest: '-0.045em', tighter2: '-0.03em' },
      boxShadow: {
        soft: '0 1px 2px rgba(23,25,28,.04), 0 8px 24px -12px rgba(23,25,28,.12)',
        lift: '0 1px 2px rgba(23,25,28,.05), 0 24px 60px -24px rgba(23,25,28,.25)',
        frame: '0 0 0 1px rgba(23,25,28,.06), 0 30px 80px -30px rgba(23,25,28,.35)',
      },
      maxWidth: { prose2: '62ch' },
    },
  },
  plugins: [],
}
