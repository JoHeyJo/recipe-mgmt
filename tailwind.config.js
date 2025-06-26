const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist: ["bg-accent", "bg-secondary-accent"],
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        text: "var(--text-color)",
        background: "var(--background-primary)",
        accent: "var(--accent)",
        "input-highlight": "var(--input-highlight)",
        "border-color": "var(--border-color)",
        "data-hover": "var(--data-hover)",
        "card-background": "var(--card-background)",

        "button-default": "var(--button-default)",
        "button-hover": "var(--button-hover)",
        "button-clicked": "var(--button-clicked)",
        "button-disabled": "var(--button-disabled)",

        "light-border": "var(--light-border)",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
