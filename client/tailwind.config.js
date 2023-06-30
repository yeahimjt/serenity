/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'tablet': '834px',
        'mobile': '320px',
      },
      fontFamily: {
        important: ["Vidaloka", "serif"],
        base: ["Roboto", "sans-serif"]
      },
      fontSize: {
        'bigger': '32px',
        'big': '30px',
        'med': '19px',
      },
      borderRadius: {
        'login': '20px 20px 20px 20px',
        'general': '40px 40px 40px 40px',
        'input': '5px 5px 5px 5px',
      },
      boxShadow: {
        'category' :'0px 0px 8px 0px rgba(0, 0,0,0.25)'
      },
      margin: {
        'base': '40px',
      }
    },
  },
  plugins: [],
}