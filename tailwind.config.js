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
        'secondary': {
   50: 'var(--secondary-50)',
   100: 'var(--secondary-100)',
   200: 'var(--secondary-200)',
   300: 'var(--secondary-300)',
   400: 'var(--secondary-400)',
   500: 'var(--secondary-500)',
   600: 'var(--secondary-600)',
   700: 'var(--secondary-700)',
   800: 'var(--secondary-800)',
   900: 'var(--secondary-900)',
   950: 'var(--secondary-950)',
 },
        text: 'var(--text-color)',
        background: 'var(--background-primary)',
        accent: 'var(--accent-highlight)',
        "data-hover":'var(--data-hover)',
        "card-background": 'var(--card-background)',
        "light-border":'var(--light-border)'
  },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
