/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['como', 'sans-serif']
      },
      colors: {
        'grey-primary': '#252826',
        'grey-footer': '#151515',
        'action-yello': '#FFAC00',
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
      },
      backgroundImage: {
        'desktop-landing-page': "url('/Keis3.JPG')",
        'mobile-landing-page': "url('/KeiMobileLanding2.jpg')",
        'kei-footer': "url('/Kei-footer.png')",
        'landing-page-kei-lineup': "url('/LandingKeiLineUp2.png')",
      },
    },
  },
  plugins: [],
}

