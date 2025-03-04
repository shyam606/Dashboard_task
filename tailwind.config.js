/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: ["./src/**/*.{html,js}", './public/index.html',],
  theme: {
    colors:{
      White:'var(--defaultWhiteColor)',
      BlueDark:'var(--blueDark)',
      BlueLight:'var(--blueLight)',
      TextYellow:'var(--textYellow)',
      Yellow:'var(--Yellow)',
      Black:'var(--black)',
      ParrotGreen:'var(--parrotGreen)',
      SkyBlueDark:'var(--skyBlueDark)',
      Grey:'var(--Grey)',
      Transparent:'transparent'
    },
    extend: {
      width:{
        '95':'95%'
      }
    },
  },
  plugins: [],
}

