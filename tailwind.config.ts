import type { Config } from "tailwindcss";
import colors from "./src/styles/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        background: colors.background,
        text: colors.text,
        mutedText: colors.mutedText,
        border: colors.border,
        darkGray: colors.darkGray,
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeInfromBottom: {
          "0%": {
            opacity: "0",
            transform: "translate(0, 50%) translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0, 0%) translateY(0px)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        shimmer: "shimmer 1.5s infinite linear",
        fadeInfromBottom: "fadeInfromBottom 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
