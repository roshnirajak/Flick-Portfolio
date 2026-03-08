/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-grey": "var(--dark-grey)",
      },
      fontFamily: {
        akira: ["var(--font-akira-expanded)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
