/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["index.html"],
  theme: {
    fontSize: {
      tiny: "12px",
      small: "14px",
      base: "16px",
      sm: "18px",
      lg: "24px",
      xl: "36px",
    },
    extend: {
      fontFamily: {
        firaSans: ["Fira Sans", "sans-serif"],
      },
      colors: {
        "purple-link": "#5551FF", // light purple
        "midnight-black": "#282828", // midnight-black
      },
    },
  },
  plugins: [],
};
