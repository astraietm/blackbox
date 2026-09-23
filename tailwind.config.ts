import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050810",
        "bg-secondary": "#080d18",
        "bg-surface": "#0d1117",
        "bg-elevated": "#131a26",
        "border-dim": "#1e2d3d",
        "accent-cyan": "#00d4ff",
        "accent-purple": "#7c3aed",
        "accent-green": "#00ff87",
        "accent-red": "#ff4757",
        "accent-amber": "#ffa502",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
