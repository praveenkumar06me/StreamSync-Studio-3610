/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB954',
          dark: '#169c46',
          light: '#1ed760'
        },
        dark: {
          DEFAULT: '#121212',
          lighter: '#282828',
          light: '#181818'
        }
      },
      animation: {
        'music-bar': 'music-bar 1.5s ease-in-out infinite',
      },
      keyframes: {
        'music-bar': {
          '0%,100%': { height: '0.75rem' },
          '50%': { height: '2rem' },
        }
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}