/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cobalt: "#0047AB",
        "neon-green": "#39FF14",
        "medical-cyan": "#22d3ee",
        "cyber-purple": "#8b5cf6",
        "deep-ocean": "#0f172a",
      },
    },
  },
  plugins: [],
}
