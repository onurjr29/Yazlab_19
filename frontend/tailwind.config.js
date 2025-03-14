/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React bileşenlerini içeren tüm dosyalar
    "./components/**/*.{js,jsx,ts,tsx}", // ShadCN UI bileşenleri için
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
