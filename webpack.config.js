const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  externals: {
    jquery: "jQuery",
  },

  entry: {
    //Bootstrap ^4
    bootstrap: path.resolve(
      __dirname,
      "src/js/vendors",
      "bootstrap.bundle.min.js"
    ),
    //App JS
    index: path.resolve(__dirname, "src/js", "index.js"),
  },
  output: {
    filename: "js/[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      inject: "body",
    }),

    new HtmlWebpackPlugin({
      filename: "orders.html",
      template: path.resolve(__dirname, "src", "orders.html"),
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "products.html",
      template: path.resolve(__dirname, "src", "products.html"),
      inject: "body",
    }),

    new HtmlWebpackPlugin({
      filename: "users.html",
      template: path.resolve(__dirname, "src", "users.html"),
      inject: "body",
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      cleanAfterEveryBuildPatterns: ["dist"],
    }),

    new MiniCssExtractPlugin({
      filename: "./css/[contenthash].index.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          //Extract CSS from JS to Seperate file
          MiniCssExtractPlugin.loader,
          //CSS loader
          "css-loader",
          //POST CSS AUTOPREFIXER
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          //SASS loader
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/images",
          },
        },
      },
    ],
  },
};
