/** @type {import('tailwindcss').Config} */

module.exports = {
  // purge: ['./dist/*.html'],

  content: [
    "./client/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./public/index.html",
  ],

  variants: {
    borderWidth: ["responsive", "last", "hover", "focus"],
  },

  theme: {
    colors: {
      lightBackground: "#fdf5e8",
      darkBackground: "#EDE4C5",
      darkFont: "#333333",
      blackColor: "#000000",
      disabledButtonBackground: "#E6E2D8",
      errorFont: "rgba(153, 27, 27)",
    },
    extend: {
      fontFamily: {
        creepster: ["Creepster", "cursive"],
        "old-standard-tt": ['"Old Standard TT"', "serif"],
        playfair: ['"Playfair Display"', "serif"],
        "playfair-sc": ['"Playfair Display SC"', "serif"],
        "cormorant-sc": ['"Cormorant SC"', "serif"],
      },
    },
  },

  plugins: [],
};
