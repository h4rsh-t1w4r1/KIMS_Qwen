import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F1EA",
        surface: "#EAE5DA",
        ink: "#1C2320",
        quiet: "#5B635E",
        line: "#D8D2C4",
        gold: "#7A5C1E",
        goldsoft: "#A98B4F",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
