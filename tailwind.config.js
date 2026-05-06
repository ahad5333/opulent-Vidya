/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2FA84F",
          light: "#4ade80",
          dark: "#166534",
        },
        secondary: {
          DEFAULT: "#001F3F",
          light: "#003366",
        },
        text: {
          DEFAULT: "#111827",
          muted: "#4B5563",
        },
        bg: {
          DEFAULT: "#FFFFFF",
          alt: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
