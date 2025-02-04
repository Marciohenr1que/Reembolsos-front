/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true, // Centraliza automaticamente
      padding: "2rem", // Adiciona espaçamento nas laterais
    },
    extend: {
      screens: {
        xs: "475px", // Adiciona um breakpoint extra pequeno
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
