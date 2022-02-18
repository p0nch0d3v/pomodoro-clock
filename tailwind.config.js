module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  assetsInclude: ['**/*.mp3'],
  theme: {
    extend: {
        fontSize: {
          "4.5vw": "4.5vw",
          "6vw": "6vw",
          "50vh": "50vh"
        }
      }
  },
  plugins: [],
}
