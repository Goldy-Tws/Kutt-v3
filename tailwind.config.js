/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kutt: {
          bg: "#06080A",
          surface: "#0B0E14",
          card: "#10161F",
          cardHover: "#161E2B",
          border: "#1E2736",
          borderHover: "#2C384D",
          green: "#00FF66",
          greenDark: "#00CC52",
          greenGlow: "rgba(0, 255, 102, 0.4)",
          mint: "#38EF7D",
          muted: "#8A96A6",
          textLight: "#E6ECF5",
          red: "#FF3B56",
          amber: "#FFB020",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px -5px rgba(0, 255, 102, 0.45)",
        "neon-lg": "0 0 50px -10px rgba(0, 255, 102, 0.55)",
        "neon-border": "0 0 0 1px #00FF66, 0 0 20px -3px rgba(0, 255, 102, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("light", "html.light &");
    },
  ],
};
