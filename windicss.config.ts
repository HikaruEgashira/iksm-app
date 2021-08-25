import { defineConfig, transform } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["**/*.{html,js,jsx,ts,tsx,css}"],
    exclude: ["node_modules", ".git", ".next"],
  },
  darkMode: false, // or 'media' or 'class'
  plugins: [require("windicss/plugin/typography"), transform("daisyui")],
  theme: {
    fontFamily: {
      ika: ["ikamodoki", "paintball"],
      inkling: ["inkling"],
    },
    extend: {
      colors: require("daisyui/colors"),
    },
  },
});
