import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B2240",
          navyDark: "#061324",
          navyLight: "#133560",
          gold: "#C5A85C",
          goldLight: "#DFCA89",
          goldDark: "#9E8138",
          bronze: "#A67C52",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-heading)", "serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(197, 168, 92, 0.25)",
        "gold-lg": "0 10px 30px -4px rgba(197, 168, 92, 0.35)",
        navy: "0 10px 30px -4px rgba(11, 34, 64, 0.4)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DFCA89 0%, #C5A85C 50%, #9E8138 100%)",
        "navy-gradient": "linear-gradient(180deg, #0B2240 0%, #061324 100%)",
        "navy-card": "linear-gradient(135deg, rgba(19, 53, 96, 0.5) 0%, rgba(11, 34, 64, 0.8) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
