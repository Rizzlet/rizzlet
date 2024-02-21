/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      animation:{
        "question-up": "question-up ease-in-out 1s",
        "question-down": "question-down ease-in-out 1s",
        "answer-visibility-on": "answer-visibility-on linear 6s",
        "answer-visibility-off": "answer-visibility-off linear 1s",
        "left-next-appear": "left-next-appear ease-out 1s",
        "right-next-appear": "right-next-appear ease-out 1s",
      },

      keyframes:{
        "question-up": {'0%': {height: '100%'}, '100%': {height: '16.666667%'}},
        "question-down": {'0%': {height: '16.666667%'}, '100%': {height: "100%"}},
        "answer-visibility-on": {'0%': {opacity: '0', visbility: "hidden"}, '100%': {opacity: '100%', visbility: "visible"}},
        "answer-visibility-off": {'0%': {opacity: '100%', visbility: "visible"}, '100%': {opacity: '0', visbility: "hidden"}},
        "left-next-appear": {'0%': {opacity: '0%', transform:'translateX(-30px)'}, '100%': {opacity: '100%', transform:'translateX(0px)'}},
        "right-next-appear": {'0%': {opacity: '0%', transform:'translateX(30px)'}, '100%': {opacity: '100%', transform:'translateX(0px)'}}
      },

      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },

    },
  },
  plugins: [import("@tailwindcss/forms")],
};
