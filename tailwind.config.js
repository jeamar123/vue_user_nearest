module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-primary' : '#476A9D',      
        'c-secondary' : '#476A9D',      
        'c-fade-blue' : '#C0D0E5',          
        'c-fade-gray' : '#7c7b7c',          
        'loader' : '#0000007d',                 
        'violet' : '#393C8E',             
      },
      fontSize: {
        'xxs': '.65rem',
        'xxxs': '.55rem',
      },
      gridTemplateRows:  {
        '12': 'repeat(12, minmax(0, 1fr));',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
