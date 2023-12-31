const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {   
      colors: {
        "gray": {
          100: "#e6e6e7",
          200: "#d0d0d1",
          300: "#afb0b1",
          400: "#878889",
          500: "#6c6d6e",
          600: "#5c5d5e",
          700: "#4e4e50",
          800: "#444446",
          900: "#3f3f40",
          950: "#262626",
        },
        "jaffa": {
          100: "#fbe9ca",
          200: "#f8d18f",
          300: "#f4b455",
          400: "#f2a341",
          500: "#ea7816",
          600: "#cf5610",
          700: "#ac3a11",
          800: "#8c2e14",
          900: "#732614",
          950: "#421106",
        },
        "pink": {
          100: "#faeada",
          200: "#f2cdac",
          300: "#ecb385",
          400: "#e38b54",
          500: "#dc6d33",
          600: "#ce5628",
          700: "#ab4223",
          800: "#893623",
          900: "#6f2f1f",
          950: "#3b150f",
        },
        "carnation": {
          100: "#fde5e3",
          200: "#fcd0cc",
          300: "#f9afa8",
          400: "#f26b5e",
          500: "#ea5749",
          600: "#d63b2c",
          700: "#b42e21",
          800: "#95291f",
          900: "#7c2820",
          950: "#43110c",
        },
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in 4s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatBubble: {
          '0%': { transform: 'translate(0,  -50px)' },
          '50%': { transform: 'translate(0,  50px)' },
          '100%': { transform: 'translate(0,  0px)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};