/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A142F',
          dark: '#0F1A36',
          slate: '#1E293B',
          blue: '#1D4ED8',
          royal: '#2563EB',
          lightBlue: '#EFF6FF',
          gold: '#F59E0B',
          amber: '#D97706',
          yellowLight: '#FEF3C7',
          teal: '#0D9488',
          purple: '#7C3AED'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.10)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.35)'
      }
    },
  },
  plugins: [],
}
