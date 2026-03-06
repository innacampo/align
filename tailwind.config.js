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
          navy: "#041E42",
          "navy-light": "#0A2A5C",
          teal: "#00A19A",
          "teal-light": "#00C4BC",
          coral: "#E8735A",
          "coral-light": "#F09880",
          bg: "#F7F8FA",
          "bg-alt": "#ECEEF2",
          card: "#FFFFFF",
          text: "#1A1A2E",
          "text-secondary": "#5A6377",
          border: "#E2E6EC",
          "border-dark": "#C8CED8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(4, 30, 66, 0.06), 0 4px 12px rgba(4, 30, 66, 0.04)",
        "card-hover": "0 4px 12px rgba(4, 30, 66, 0.1), 0 8px 24px rgba(4, 30, 66, 0.06)",
        "elevated": "0 8px 30px rgba(4, 30, 66, 0.12)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
