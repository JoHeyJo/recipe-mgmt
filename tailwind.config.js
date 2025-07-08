const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist: ["bg-accent", "bg-secondary-accent", "test-color"],
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "background-color": "var(--background-color)",
        "text-color": "var(--form-text-color)",
        accent: "var(--accent)",

        "button-submit": "var(--button-submit)",
        "button-cancel": "var(--button-cancel)",
        "border-color-light": "var(--border-color-light)",
        "border-color-dark": "var(--border-color-dark)",
        "test-color": "var(--test-color)",
        selected: "var(--selected)",
        // "light-border": "var(--light-border)",
        // accent: "var(--accent)",
        // primary: "var(--primary)",
        //   // text: "var(--text-color)",
        //   background: "var(--background-primary)",
        //   "accent-secondary": "var(--accent-secondary)",
        //   "input-highlight": "var(--input-highlight)",

        // "border-color": "var(--border-color)",
        // "border-color-dark": "var(--border-color-dark)",

        "data-hover": "var(--data-hover)",
        //   "data-hover-dark": "var(--data-hover-dark)",

        // "card-background": "var(--card-background)",

        //   "button-default": "var(--button-default)",
        //   "button-hover": "var(--button-hover)",
        //   "button-clicked": "var(--button-clicked)",
        //   "button-disabled": "var(--button-disabled)",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
