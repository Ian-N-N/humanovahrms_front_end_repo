/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FFC107",
        "primary-dark": "#2E3B84",
        "secondary-red": "#E10000",
        "sidebar-bg": "#0D1B3E",
        "sidebar-accent": "#1a2b5e",
        "background-light": "#EBF2FA", 
        "background-dark": "#121212",
        "surface-dark": "#1E1E1E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}