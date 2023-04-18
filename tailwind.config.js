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
    screens: {
      xs: "550px",
      sm: "640px",
      md: "821px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      lightBackground: "#fdf5e8",
      darkBackground: "#EDE4C5",
      darkFont: "#333333",
      blackColor: "#000000",
      fadedFont: "#B3B3B3",
      disabledButtonBackground: "#f2f2f2",
      disabledCodeEditor: "#EDE9DF",
      errorFont: "rgba(153, 27, 27)",
      goldTrophy: "#c9b037",
      silverTrophy: "#d7d7d7",
      bronzeTrophy: "#8C7853",
    },
    extend: {
      fontFamily: {
        creepster: ["Creepster", "cursive"],
        "old-standard-tt": ['"Old Standard TT"', "serif"],
        playfair: ['"Playfair Display"', "serif"],
        "playfair-sc": ['"Playfair Display SC"', "serif"],
        cormorant: ['"Cormorant"', "serif"],
        "cormorant-sc": ['"Cormorant SC"', "serif"],
      },
      minWidth: {
        72: "16rem",
        10: "2.5rem",
        8: "2rem",
      },
      minHeight: {
        72: "16rem",
        10: "2.5rem",
        8: "2rem",
      },
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
