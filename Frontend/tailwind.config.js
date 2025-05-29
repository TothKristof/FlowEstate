/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // This completely disables themes
    styled: true,
    base: true,
    utils: true,
    logs: false,
    themeRoot: ":root"
  }
} 