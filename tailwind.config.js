/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['como', 'sans-serif']
      },
      colors: {
        'grey-primary': '#252826',
        'grey-footer': '#151515',
        'action-yellow': '#FFAC00',
        'comment-card-color': '#F1F1F1',
        'comment-card-review-date-color': '#838383',
        'border-gray': '#D3D3D3',
        'gray-text': '#A9A9A9',
        'search-background': '#F4F8F9',
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
        'inventory-kei-banner': "url('/InventoryBanner.jpg')",
        'subaru-comparison': "url('/Subaru.png')",
        'suzuki-comparison': "url('/Suzuki.png')",
        'honda-comparison': "url('/Honda.png')",
        'mitsubishi-comparison': "url('/Mitsubishi.png')",
        'daihatsu-comparison': "url('/Daihatsu.png')",
      },
      dropShadow: {
        'lg': '0 10px 8px rgb(0, 0, 0, 0.2)',
      },
      screens: {
        'navLineWrapEnd': '768px',
        'navLineWrapStart': '1425px',
        'threeInventoryColBreakPoint': '950px',
        'fourInventoryColBreakPoint': '1160px',
        'fiveInventoryColBreakPoint': '1600px',
        'sixInventoryColBreakPoint': '1790px',
        'eightInventoryColBreakPoint': '1929px',
        'largerMobile': '391px',
      },
      rotate: {
        '135': '135deg',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

