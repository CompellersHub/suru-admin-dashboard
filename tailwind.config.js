/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar-color": "var(--navbar-color)",
        "primary-color": "var(--primary-color)",
        ray: "var(--ray)",
        "secondary-color": "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
