/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: ['Silkscreen', 'cursive'],
      },
      gridTemplateColumns: {
        "2-uneven": "60% 40%",
      },
      animation: {
        "question-up": "question-up ease-in-out 1s",
        "question-down": "question-down ease-in-out 1s",
        "answer-visibility-on": "answer-visibility-on linear 6s",
        "answer-visibility-off": "answer-visibility-off linear 1s",
        "left-next-appear": "left-next-appear ease-out 1s",
        "right-next-appear": "right-next-appear ease-out 1s",
        "slow-ping": "slowping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        
      },

      keyframes: {
        "question-up": {
          "0%": { height: "100%" },
          "100%": { height: "16.666667%" },
        },
        "question-down": {
          "0%": { height: "16.666667%" },
          "100%": { height: "100%" },
        },
        "answer-visibility-on": {
          "0%": { opacity: "0", visbility: "hidden" },
          "100%": { opacity: "100%", visbility: "visible" },
        },
        "answer-visibility-off": {
          "0%": { opacity: "100%", visbility: "visible" },
          "100%": { opacity: "0", visbility: "hidden" },
        },
        "left-next-appear": {
          "0%": { opacity: "0%", transform: "translateX(-30px)" },
          "100%": { opacity: "100%", transform: "translateX(0px)" },
        },
        "right-next-appear": {
          "0%": { opacity: "0%", transform: "translateX(30px)" },
          "100%": { opacity: "100%", transform: "translateX(0px)" },
        },
        "slowping": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "50%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(1.2)", opacity: "0" }
        }
      },

      colors: {
        primary: "#d3f1e2",
      },
    },
  },
  plugins: [import("@tailwindcss/forms")],
};
export default config;
