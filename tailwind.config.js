/** @type {import('tailwindcss').Config} */

module.exports = {
    // purge: ['./dist/*.html'],
  
    content: [
      './client/**/*.{html,js}',
      './components/**/*.{html,js}',
      './public/index.html',
    ],

    variants: {
      borderWidth: ['responsive', 'last', 'hover', 'focus'],
    },

    theme: {
      extend: {
        fontFamily: {
          'creepster': ['Creepster', 'cursive'],
          'old-standard-tt': ['"Old Standard TT"', 'serif'],
          'playfair': ['"Playfair Display"', 'serif'],
          'playfair-sc': ['"Playfair Display SC"', 'serif'],
          'cormorant-sc': ['"Cormorant SC"', 'serif']
        }
      }
    },

    plugins: [],
  };
  