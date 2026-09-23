/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6600',
          orangeHover: '#EA580C',
          orangeLight: '#FFF7ED',
          dark: '#0B0F19',
          navy: '#0B1220',
          btnOrange: '#C2410C',
          warmAccent: '#F97316',
          trustTeal: '#0F766E',
          surfaceLight: '#F8FAFC',
          darkCard: '#111827',
          slateText: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: [],
  safelist: [
    'border-red-500',
    'ring-2',
    'ring-red-400',
    'border-emerald-500',
    'ring-emerald-400',
    'text-emerald-500',
    'text-red-500',
    'hidden',
    'opacity-0',
    'opacity-100',
    'invisible',
    'visible',
    'translate-y-0',
    'translate-y-4',
    'scale-95',
    'scale-100',
    'pointer-events-none',
    'bg-[#FF6600]',
    'text-white',
    'text-slate-900',
    'shadow-md',
    'active'
  ]
}
