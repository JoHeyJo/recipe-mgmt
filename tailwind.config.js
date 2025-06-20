const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    
  colors: {
    "primary": "#1F2937",
    "secondary": "#E5E7EB",
    "primary-dark": "#1F2937",
    "secondary-dark": "#1A202C",
    "text-color": "1A202C",
    "text-color-dark": "F0F2F4",

  },

    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
