/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primeBlue": "#150dab",
        "midBlue": "#0f4fbe",
        "lightBlue": "#1290c1"
      }
    }
  },
  plugins: []
};