/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}",
    "!./node_modules/**",
    "!./server.js",
  ],
  theme: {
    extend: {
      colors: {
        align: {
          bg: "#0A1930",
          text: "#E1E6F0",
          accent: "#2C5F8A",
          card: "#1A2940",
          dark: "#0F1F2C",
          hover: "#3A6F9A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
