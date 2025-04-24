// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      clipPath: {
        skew: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
      },
      colors: {
        brand: {
          white: '#FFFFFF',
          blue: '#3D57F2',
          dark: '#05095F',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        stockpadi: {
          primary: '#3D57F2',
          secondary: '#05095F',
          accent: '#F5F5F5',
          neutral: '#1C1C1C',
          'base-100': '#FFFFFF', // White background
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
