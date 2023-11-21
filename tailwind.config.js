/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333",
        secondary: "#666",
        blue: {
          500: "#999",
        },
      },
    },
  },
  plugins: [],
};
