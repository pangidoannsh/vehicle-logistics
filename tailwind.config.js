/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#2c4d45",
        "gold": "#DDA842",
        "light-green": "#01964C",
        "custom-blue": "#015796"
      }
    },
  },
  plugins: []
}
