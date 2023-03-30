/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        gridTemplateColumns: {
          'dashboard': 'repeat(auto-fill, minmax(470px, 1fr))',
        }

    },
  },
  plugins: [],
}
