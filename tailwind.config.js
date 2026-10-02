/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0908',
          light: '#141210',
          lighter: '#1d1a17',
        },
        amber: {
          DEFAULT: '#d9a05b',
          light: '#f0c285',
          dark: '#a9742f',
        },
        teal: {
          DEFAULT: '#0e3d3c',
          light: '#1f6160',
          dark: '#082625',
        },
        mist: {
          DEFAULT: '#ece6da',
          dim: '#9b948a',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        grainShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -4%)' },
          '30%': { transform: 'translate(3%, 2%)' },
          '50%': { transform: 'translate(-4%, 3%)' },
          '70%': { transform: 'translate(2%, -3%)' },
          '90%': { transform: 'translate(-3%, 1%)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.4s ease-out both',
        grain: 'grainShift 1.2s steps(4) infinite',
      },
    },
  },
  plugins: [],
}