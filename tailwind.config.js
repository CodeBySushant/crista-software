/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' }, screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        // Theme colours come from CSS variables (src/styles/globals.css):
        // black + silver by default, light values inside `.theme-light`.
        brand: { green: '#F4F4F5', emerald: '#D4D4D8', cyan: '#A1A1AA' },
        ink: { DEFAULT: 'rgb(var(--ink) / <alpha-value>)', 900: '#17191C', 800: '#1F2226', 700: '#2A2E33', 600: '#3A3F45' },
        inverse: 'rgb(var(--inverse) / <alpha-value>)',
        surface: { DEFAULT: 'rgb(var(--surface) / <alpha-value>)', raised: 'rgb(var(--surface-raised) / <alpha-value>)' },
        paper: { DEFAULT: 'rgb(var(--paper) / <alpha-value>)', off: 'rgb(var(--paper-off) / <alpha-value>)', grey: 'rgb(var(--paper-grey) / <alpha-value>)' },
        line: { DEFAULT: 'rgb(var(--line) / <alpha-value>)', dark: '#2C3136' },
        muted: { DEFAULT: 'rgb(var(--muted) / <alpha-value>)', dark: '#9AA1A7' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, #FAFAFA 0%, #D4D4D8 50%, #A1A1AA 100%)',
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
