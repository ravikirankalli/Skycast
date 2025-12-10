module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'glass': 'rgba(25,26,50,0.55)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(34,44,54,0.2)'
      }
    }
  },
  plugins: [],
}
