/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },

      screens: {
        sm: "750px",
        md: "950px",
        lg: "1024px",
        xl: "1280px",
        // Add your custom breakpoints here
        custom: "1024px",
        customMdd:"970px",
        customLogo:"835px",
      },
    },
  },
  plugins: [],
}