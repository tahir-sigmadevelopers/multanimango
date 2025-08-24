/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "loop-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // move half since we duplicate images
        },
      },
      animation: {
        "loop-scroll": "loop-scroll 30s linear infinite", // adjust 30s for speed
      },
    },
  },
  plugins: [],
};
