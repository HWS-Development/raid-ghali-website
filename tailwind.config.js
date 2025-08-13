/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        oasis: '#0E3B34',       // primary
        mint: '#DFF3EA',        // soft bg / booking panels
        sand: '#E7D6C4',        // alt section bg
        terracotta: '#C65A2E',  // accents
        ivory: '#F9F6F1',       // page bg
        charcoal: '#1F1F1F',    // text
        brass: '#C9A227',       // tiny highlights
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
