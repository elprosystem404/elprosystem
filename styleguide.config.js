const path = require("path");

module.exports = {
  components: "src/components/**/*.js",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
          ,
        }
      ]
    }
  },
  title: "react-eform-control",
  styleguideDir: "dist-docs",
  moduleAliases: {
    "react-eform-control": path.resolve(__dirname, "src")
  }
}