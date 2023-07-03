/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
  ],
  theme: {
    extend: {
      width: {
        'custom': '60rem',
      }
    },
  },
  plugins: [],
}

