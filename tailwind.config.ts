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
        gold: {
          DEFAULT: "#d6a429",
          50: "#fbf3df",
          400: "#e8c15f",
          500: "#d6a429",
          600: "#b2841c",
          700: "#8f6816",
        },
        teal: {
          DEFAULT: "#1b92a6",
          50: "#e8f6f8",
          100: "#bfe6ec",
          300: "#5cbecd",
          400: "#3daec2",
          500: "#1b92a6",
          600: "#146f80",
          700: "#0f5763",
          900: "#0a3941",
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
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(214,164,41,0.14), transparent 60%)",
        skateboards:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cg fill='none' stroke='%23f3ecdd' stroke-width='2'%3E%3Cg transform='translate(36,44) rotate(-18)'%3E%3Crect x='-32' y='-9' width='64' height='18' rx='9'/%3E%3Ccircle cx='-19' cy='13' r='4.5'/%3E%3Ccircle cx='19' cy='13' r='4.5'/%3E%3C/g%3E%3Cg transform='translate(190,90) rotate(22)' opacity='0.8'%3E%3Crect x='-26' y='-7' width='52' height='15' rx='7.5'/%3E%3Ccircle cx='-15' cy='11' r='3.6'/%3E%3Ccircle cx='15' cy='11' r='3.6'/%3E%3C/g%3E%3Cg transform='translate(80,170) rotate(58)' opacity='0.7'%3E%3Crect x='-22' y='-6' width='44' height='13' rx='6.5'/%3E%3Ccircle cx='-13' cy='9' r='3'/%3E%3Ccircle cx='13' cy='9' r='3'/%3E%3C/g%3E%3Cg transform='translate(220,220) rotate(-42)' opacity='0.6'%3E%3Crect x='-18' y='-5' width='36' height='11' rx='5.5'/%3E%3Ccircle cx='-11' cy='7.5' r='2.6'/%3E%3Ccircle cx='11' cy='7.5' r='2.6'/%3E%3C/g%3E%3Cg transform='translate(130,20) rotate(8)' opacity='0.5'%3E%3Crect x='-15' y='-4' width='30' height='9' rx='4.5'/%3E%3Ccircle cx='-9' cy='6' r='2.2'/%3E%3Ccircle cx='9' cy='6' r='2.2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
