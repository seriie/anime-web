/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'smooth': '0 0px 12px rgba(100, 100, 100, 0.3);'
      }
    },
  },
  plugins: [],
}