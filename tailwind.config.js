const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist:["bg-accent","bg-secondary-accent"],
  darkMode: "selector",
  content: ["./index.html","./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
    "primary": "#1F2937",
    "secondary": "#E5E7EB",
    "primary-dark": "#1F2937",
    "secondary-dark": "#1A202C",
    "text-color": "#1A202C",
    "text-color-dark": "#F0F2F4",
    "accent": "#D2D5D8",
    "secondary-accent": "#F0F2F4",
  },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
