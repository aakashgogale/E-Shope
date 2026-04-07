/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F2F0F1',
          'dark-gray': '#666666',
          'light-gray': '#F0EEED',
          red: '#FF3333',
          green: '#01AB31',
          yellow: '#FFC633',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
