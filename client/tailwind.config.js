/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'custom-hsla': 'hsla(0, 100%, 50%, 0.707)',
      },
    },
  },
  plugins: [],
}

