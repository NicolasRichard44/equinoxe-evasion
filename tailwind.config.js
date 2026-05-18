/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        'warm-white': '#faf8f4',
        earth: {
          50: '#fdf9f3',
          100: '#f5efe1',
          200: '#e8d9bf',
          300: '#d4b896',
          400: '#c09a6e',
          500: '#a67c52',
          600: '#8b6340',
          700: '#6f4e31',
          800: '#5a3e28',
          900: '#3d2a1a',
        },
        forest: {
          50: '#f2f6f1',
          100: '#ddebd9',
          200: '#b8d5b0',
          300: '#8ab97f',
          400: '#5e9953',
          500: '#3d7534',
          600: '#2e5c27',
          700: '#224520',
          800: '#183218',
          900: '#0f200f',
        },
        gold: {
          400: '#d4a853',
          500: '#c49840',
          600: '#b08830',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
