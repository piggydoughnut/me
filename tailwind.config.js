/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["index.html"],
  theme: {
    fontSize: {
      'base': '16px',
      'sm': '18px',
      'lg': '24px',
      'xl': '36px'
    },
    extend: {
      fontFamily: {
        firaSans: ['Fira Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}