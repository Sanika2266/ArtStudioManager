/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#FAECE7',
          100: '#F5C4B3',
          200: '#F0997B',
          400: '#E06E3F',
          500: '#D85A30',
          600: '#C24E27',
          700: '#993C1D',
        },
        ink: '#0f172a',
        muted: '#64748b',
        surface: '#ffffff',
        canvas: '#f8fafc',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)',
        cardHover: '0 2px 4px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
}