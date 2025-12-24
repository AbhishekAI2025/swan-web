/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1f7a8c',
          deep: '#0f3b3f',
          sand: '#f6f1e9',
          sky: '#e8f3f9',
          accent: '#f29d52',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 15px 50px rgba(15, 58, 63, 0.08)',
      },
    },
  },
  plugins: [],
}
