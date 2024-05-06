/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    borderRadius: {
      'none': '0',
      'sm': '10px',
      'md': '20px',
      'lg': '30px',
      'full': '50%',
    }
  },
  plugins: [],
}