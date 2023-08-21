/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // //! Error: Babel- translateX depreciated
      // animation: {
      //   overFlo: "4s infinite",
      // },
      // keyframes: {
      //   overFlo: {
      //     "0%, 100%": { width: "100%" },
      //     "50%": { width: "20%" },
      //     // from: { transform: translateX(0) },
      //     // to: { transform: translateX(calc(-100 % +"200px")) },
      //   },
      // },
    },
  },
  plugins: [],
};
