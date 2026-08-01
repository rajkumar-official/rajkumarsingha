/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Cyan pulled from the "Raj Kumar" logo
        brand: {
          50: "#eefaff",
          100: "#d9f2fd",
          200: "#b9e9fc",
          300: "#86dbfa",
          400: "#41c5f2",
          500: "#1cb0e6",
          600: "#0e8fc4",
          700: "#0f729e",
          800: "#136083",
          900: "#15506c",
          950: "#0a3349",
        },
        // Lime pulled from the logo outline
        accent: {
          100: "#eef8d3",
          200: "#ddf1a8",
          300: "#c8e878",
          400: "#b5df53",
          500: "#a3d639",
          600: "#85b422",
          700: "#668c1b",
        },
        night: {
          950: "#060b13",
          900: "#0b1523",
          800: "#101d30",
          700: "#16263e",
        },
      },
      boxShadow: {
        nav: "0 10px 40px -12px rgba(2, 32, 55, 0.18)",
        glow: "0 0 45px -8px rgba(28, 176, 230, 0.45)",
        card: "0 18px 45px -20px rgba(2, 32, 55, 0.25)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.92)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        blob: "blob 12s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "float-delay": "float 5s ease-in-out 2.5s infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin-slow 10s linear infinite",
      },
    },
  },
  plugins: [],
};
