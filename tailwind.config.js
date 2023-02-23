const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    mode:'layers',
    content:['./public/**/*.html', './src/**/*.vue'],
    "no-empty": [true, "allow-empty-functions", "allow-empty-catch"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        emerald:  colors.emerald,
        gray: colors.trueGray,
    
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
