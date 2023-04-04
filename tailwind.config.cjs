/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        dashboard: "repeat(auto-fill, minmax(30%, 1fr))",
        tablet: "repeat(auto-fill, minmax(40.75vw, 1fr))",
      },
    },
  },
  plugins: [],
};
