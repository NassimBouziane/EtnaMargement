/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "ffffff",
        secondary: "EFE9F4",
        tertiary: "5863F8",
      },
    },
  },
  plugins: [],
};
