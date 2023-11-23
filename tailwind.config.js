/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333",
        secondary: "#666",
        blue: {
          500: "#333",
          700: "#444",
        },
        red: {
          500: "#666",
          700: "#777",
        },
      },
    },
  },
  plugins: [],
};
