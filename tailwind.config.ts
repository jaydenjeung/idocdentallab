import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  "#EDF7F2",
          100: "#D4EDE0",
          200: "#A3D4BA",
          300: "#6AB88E",
          400: "#3D9467",
          500: "#2D7A52",
          600: "#236B45",
          700: "#1A5C3A", // primary
          800: "#14442A",
          900: "#0D2E1C", // dark hero / footer
        },
        ink: {
          DEFAULT: "#0F0F0F",
          2: "#3A3A3A",
          3: "#7A7A7A",
          4: "#B8B8B8",
        },
        surface: {
          DEFAULT: "#FAFAF8",
          2: "#F2F1EE",
          3: "#E8E7E3",
        },
      },
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans:  ["DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
