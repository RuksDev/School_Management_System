import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
      },
      animation: {
        pulse: "pulse 1.5s infinite", // Custom pulse animation
        shake: "shake 0.5s ease-in-out",
        text_713: "text_713 3.5s ease infinite", // Added custom animation
        loading_713: "loading_713 3.5s ease infinite", // Added custom animation
        loading2_713: "loading2_713 3.5s ease infinite", // Added custom animation
        blink: "blink 1.5s infinite",
        fadeIn: "fadeIn 1s ease-in-out",
        errorFade: "errorFade 0.5s ease-in-out",
        fadeInShake: "fadeInShake 0.5s ease-out",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" },
        },
        text_713: {
          "0%": { letterSpacing: "1px", transform: "translateX(0px)" },
          "40%": { letterSpacing: "2px", transform: "translateX(26px)" },
          "80%": { letterSpacing: "1px", transform: "translateX(32px)" },
          "90%": { letterSpacing: "2px", transform: "translateX(0px)" },
          "100%": { letterSpacing: "1px", transform: "translateX(0px)" },
        },
        loading_713: {
          "0%": { width: "16px", transform: "translateX(0px)" },
          "40%": { width: "100%", transform: "translateX(0px)" },
          "80%": { width: "16px", transform: "translateX(64px)" },
          "90%": { width: "100%", transform: "translateX(0px)" },
          "100%": { width: "16px", transform: "translateX(0px)" },
        },
        loading2_713: {
          "0%": { transform: "translateX(0px)", width: "16px" },
          "40%": { transform: "translateX(0%)", width: "80%" },
          "80%": { width: "100%", transform: "translateX(0px)" },
          "90%": { width: "80%", transform: "translateX(15px)" },
          "100%": { transform: "translateX(0px)", width: "16px" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        errorFade: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInShake: {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "50%": {
            opacity: "1",
            transform: "translateX(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xlg: "1400px", // Custom screen size
        "2xlg": "1600px", // Another custom screen size
      },
      colors: {
        ruksSkyBlue: "#8BCDF6",
        ruksSkyBlueLight: "#BDE0FE",
        ruksPurple: "#C2AFE0",
        ruksPurpleLight: "#D9BCFF",
        ruksYellow: "#FFF066",
        ruksYellowLight: "#FCDB6D",
      },
    },
  },
  plugins: [],
};

export default config;
