/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0f0f",
        foreground: "#e5e5e5",
        primary: "#00ff7f",
        secondary: "#1a1a1a",
        accent: "#00ffe0",
        card: "#1c1c1c",
        border: "#333333",
        "muted-foreground": "#888888"
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
}
