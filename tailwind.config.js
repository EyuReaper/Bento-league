/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stadium-navy': '#020617',
        'electric-emerald': '#34d399',
      },
    },
  },
  plugins: [],
}
