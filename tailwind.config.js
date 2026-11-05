/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EF',
        beige: '#EAE3D8',
        forest: '#183D32',
        forestDark: '#0E2A21',
        forestLight: '#2A5C4B',
        burnt: '#C76B43',
        burntDark: '#A8552F',
        charcoal: '#242424',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(24, 61, 50, 0.35)',
        card: '0 12px 40px -14px rgba(36, 36, 36, 0.18)',
        lift: '0 20px 50px -18px rgba(24, 61, 50, 0.30)',
      },
    },
  },
  plugins: [],
};
