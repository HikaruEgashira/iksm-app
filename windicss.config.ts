import { defineConfig, transform } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["./**/*.{html,js,jsx,ts,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  plugins: [require("windicss/plugin/typography"), transform("daisyui")],
  theme: {
    extend: {
      colors: require("daisyui/colors"),
    },
  },
  daisyui: {
    themes: [
      {
        nord: {
          primary: "#8FBCBB",
          "primary-focus": "#88C0D0",
          "primary-content": "#ECEFF4",
          secondary: "#81A1C1",
          "secondary-focus": "#5E81AC",
          "secondary-content": "#ECEFF4",
          accent: "#434C5E",
          "accent-focus": "#4C566A",
          "accent-content": "#B48EAD",
          neutral: "#2E3440",
          "neutral-focus": "#3B4252",
          "neutral-content": "#ECEFF4",
          "base-100": "#ECEFF4",
          "base-200": "#E5E9F0",
          "base-300": "#D8DEE9",
          "base-content": "#2E3440",
          info: "#EBCB8B",
          success: "#A3BE8C",
          warning: "#D08770",
          error: "#BF616A",
        },
      },
    ],
  },
});
