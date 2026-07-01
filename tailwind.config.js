/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Poppins", "Trebuchet MS", "Segoe UI", "sans-serif"],
      },
      colors: {
        ink: "#1f2933",
        muted: "#64748b",
        line: "#cbd5e1",
        paper: "#f8fafc",
        panel: "#ffffff",
        accent: "#0f766e",
        "accent-dark": "#115e59",
        soft: "#e2e8f0",
        warn: "#9a3412",
      },
      boxShadow: {
        soft: "0 16px 34px rgba(15, 52, 98, 0.10)",
      },
    },
  },
  plugins: [],
}
