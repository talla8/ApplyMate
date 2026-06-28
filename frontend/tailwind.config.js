/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbf5',
          100: '#e4f4df',
          200: '#cae7c0',
          300: '#add89f',
          400: '#78bb6b',
          500: '#4f9b46',
          600: '#2f6f31',
          700: '#215228',
        },
        accent: {
          50: '#fff7ef',
          100: '#ffe9d0',
          200: '#ffd2a8',
          300: '#ffbb7f',
          400: '#ff9b4d',
          500: '#f57d2a',
        },
        ink: {
          900: '#183153',
          700: '#39516f',
        },
      },
      boxShadow: {
        soft: '0 30px 60px -34px rgba(24, 49, 83, 0.28)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
