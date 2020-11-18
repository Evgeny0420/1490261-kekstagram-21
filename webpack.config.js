module.exports = {
  entry: [
    "./js/zoom.js",
    "./js/random.js",
    "./js/bigPhotos.js",
    "./js/filters.js",
    "./js/debounce.js",
    "./js/main.js",
    "./js/render.js",
    "./js/popup.js",
    "./js/successErrorPopup.js",
    "./js/util.js",
    "./js/slider.js",
    "./js/validation.js",
    "./js/upload.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
