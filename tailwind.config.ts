import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08080a",
          950: "#08080a",
          900: "#0d0d10",
          800: "#141418",
          700: "#1c1c22",
          600: "#26262e",
          500: "#38383f",
        },
        cream: {
          DEFAULT: "#f3ecdd",
          50: "#fbf8f1",
          100: "#f3ecdd",
          200: "#e8ddc4",
          300: "#d8c8a3",
          400: "#c3ab7a",
        },
        flame: {
          DEFAULT: "#ff5a2b",
          50: "#fff1ea",
          400: "#ff7a4f",
          500: "#ff5a2b",
          600: "#e8430f",
          700: "#c2350c",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(255,90,43,0.14), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(255,90,43,0.45)",
        premium: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
