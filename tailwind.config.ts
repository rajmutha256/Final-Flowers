import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0.55" },
          "50%": { transform: "translateY(-20px) rotate(8deg)", opacity: "0.9" },
          "100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.55" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-6px)" },
          "80%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shake: "shake 0.35s ease-in-out",
      },
      colors: {
        blush: "#FCE7F3",
        cream: "#FFF7ED",
        lavender: "#E9D5FF",
        slate: "#334155",
      },
    },
  },
  plugins: [],
};

export default config;
