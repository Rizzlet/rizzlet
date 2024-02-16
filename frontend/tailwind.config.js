/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      animation:{
        "question-up": "question-up ease-in-out 1s",
        "question-down": "question-down ease-in-out 1s",
        "hover-selected-question": "hover-selected-question ease-in-out 2s infinite",
        "answer-visibility-on": "answer-visibility-on linear 6s",
        "answer-visibility-off": "answer-visibility-off linear 1s"
      },

      keyframes:{
        "question-up": {'0%': {height: '100%'}, '100%': {height: '16.666667%'}},
        "question-down": {'0%': {height: '16.666667%'}, '100%': {height: "100%"}},
        "hover-selected-question": {'0%': {transform: 'translateY(0px)'}, '50%': {transform: 'translateY(10px)'}, '100%': {transform: 'translateY(-5px)'}},
        "answer-visibility-on": {'0%': {opacity: '0', visbility: "hidden"}, '100%': {opacity: '100%', visbility: "visible"}},
        "answer-visibility-off": {'0%': {opacity: '100%', visbility: "visible"}, '100%': {opacity: '0', visbility: "hidden"}}
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
