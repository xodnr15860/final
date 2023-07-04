/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
  ],
  theme: {
    extend: {
      width: {
        'custom': '60rem',
      },
      maxWidth: {
        '1100': '1100px',
      },
      minWidth: {
        '750': '750px',
        '900': '900px',
        '1100': '1100px',
        '1600': '1600px'
      }
    },
  },
  plugins: [],
}

