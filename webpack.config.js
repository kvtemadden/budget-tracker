const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "development",
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  },
  entry: ["./public/index.js"],
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget App",
      description: "An application for tracking your budget",
      background_color: "#01579b",
      theme_color: "#ffffff",
      "theme-color": "#ffffff",
      start_url: "/",
      icons: [
        {
          src: path.resolve("public/icons/icon-192x192.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons")
        }
      ]
    })
  ]  
};
module.exports = config;
