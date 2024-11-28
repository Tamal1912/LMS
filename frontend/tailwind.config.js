
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
    // Custom scrollbar hide plugin
    plugin(function({ addComponents }) {
      addComponents({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',  /* Safari and Chrome */
        },
      });
    }),
  ],
};
