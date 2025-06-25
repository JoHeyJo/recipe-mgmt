const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist:["bg-accent","bg-secondary-accent"],
  darkMode: "selector",
  content: ["./index.html","./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text-color)',
        background: 'var(--background-primary)',
        accent: 'var(--accent-highlight)',
        "data-focus":'var(--data_focus)',
        "card-background": 'var(--card-background)',
  },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
