/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        'futbol-pattern':"url('/src/assets/pexels-markusspiske-114296.jpg')",
        'siluet-pattern': "url('/src/assets/siluet.png')",
        'yüzme-pattern':"url('/src/assets/desktop-wallpaper-swimming-pools-underwater.jpg')"
      },
      backgroundSize: {
        'full': '100% 100%'
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat'
      },
      backgroundPosition: {
        'center-center': 'center center'
      }
    },
  },
  plugins: [],
}

