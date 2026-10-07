/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#172033',
          900: '#0F172A',
          950: '#080D1A',
        },
        charcoal: {
          DEFAULT: '#1E293B',
          soft: '#334155',
        },
        amber: {
          safety: '#F59E0B',
          deep: '#D97706',
          light: '#FBBF24',
          // WCAG-AA safe amber for small text on white/light backgrounds
          deepText: '#A6470A',
          // WCAG-AA safe WhatsApp green (white text passes 5.4:1)
          whatsapp: '#0F7A38',
          whatsappHover: '#0B5F2B',
        },
        steel: '#64748B',
      },
      fontSize: {
        // Named display steps so the hero ramp is part of the scale,
        // not a set of arbitrary one-off values.
        'kr-display': ['2.15rem', { lineHeight: '1.06' }],
        'kr-display-xl': ['4.25rem', { lineHeight: '1.06' }],
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 10px 24px -8px rgba(15, 23, 42, 0.12)',
        'card-hover': '0 10px 20px -6px rgba(15, 23, 42, 0.12), 0 24px 48px -12px rgba(245, 158, 11, 0.22)',
        header: '0 2px 20px rgba(15, 23, 42, 0.10)',
        glow: '0 0 0 1px rgba(245, 158, 11, 0.35), 0 12px 32px -8px rgba(245, 158, 11, 0.40)',
      },
      backgroundImage: {
        'steel-grid':
          'linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)',
        'safety-stripe':
          'repeating-linear-gradient(45deg, #F59E0B 0px, #F59E0B 14px, #0F172A 14px, #0F172A 28px)',
      },
      backgroundSize: {
        grid: '48px 48px',
        stripe: '28px 28px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'accordion-down': {
          '0%': { gridTemplateRows: '0fr', opacity: '0' },
          '100%': { gridTemplateRows: '1fr', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.4s ease-out both',
        'slide-in-left': 'slide-in-left 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'accordion-down': 'accordion-down 0.32s ease-out both',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan-line 6s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}