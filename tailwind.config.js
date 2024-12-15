/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        title: ['20px', {
          fontWeight: 500
        }]
      },
      fontFamily: {
        'display': ['Oswald']
      },
      spacing: {
        'del-space': 'calc(-100% - 8px)',
      }
    },
  },
  plugins: [],
}

