/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FFF9F6',
          100: '#FAF2ED',
        },
        powder: {
          100: '#F8E6EA',
          200: '#F2D3DA',
        },
        blush: {
          200: '#E8BBC7',
          300: '#DC9DAF',
        },
        dusty: {
          400: '#C9879C',
          500: '#B06F83',
        },
        crimson: {
          600: '#B83250',
          700: '#9C2640',
        },
        burgundy: {
          800: '#6C223E',
          900: '#561B31',
        },
        wine: {
          950: '#2A0C17',
          990: '#1A070E',
        },
        rosegold: {
          300: '#DBB09B',
          400: '#C99A83',
          500: '#B3816B',
        },
        champagne: {
          200: '#EAD8CB',
          300: '#DFC6B4',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'cursive'],
      },
      backgroundImage: {
        'grain-pattern': "url('/textures/noise.svg')",
        'radial-vignette': 'radial-gradient(circle at center, transparent 40%, rgba(42, 12, 23, 0.75) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 48px -12px rgba(86, 27, 49, 0.16)',
        'luxury-lg': '0 32px 64px -16px rgba(86, 27, 49, 0.28)',
        'rosegold': '0 0 25px -4px rgba(201, 154, 131, 0.35)',
        'crimson-glow': '0 0 35px -5px rgba(184, 50, 80, 0.3)',
      },
      letterSpacing: {
        'ultra-wide': '0.28em',
        'loose-serif': '0.12em',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'velvet': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'petal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
