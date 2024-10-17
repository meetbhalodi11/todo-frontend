import flowbite from "flowbite-react/tailwind";

export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

