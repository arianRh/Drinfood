/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        primary: "#eaebef",
        secondary: "#f5c810",
        third: "#f44336",
        forth: " #f5f5f5"
        
      }
    },
  },
  plugins: [],
}
