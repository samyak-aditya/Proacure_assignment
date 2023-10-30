/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F7FF',
          200: '#BAE7FF',
          500: '#1890FF',
        },
      },
    },
  },
  plugins: [
    function ({ addBase, addUtilities }) {
      addBase({
        a: { color: 'inherit', textDecoration: 'none' },
      });

      const newUtilities = {
        '.text-underline': {
          'text-decoration': 'underline',
        },
        '.bg-opacity-90': {
          'background-color': 'rgba(0, 0, 0, 0.9)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
