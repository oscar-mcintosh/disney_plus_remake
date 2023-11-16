const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pageNames = ['index', 'disney', 'marvel', 'pixar', 'starwars', 'natgeo', 'movie-details'];
const Dotenv = require('dotenv-webpack');

const plugins = [
  new MiniCssExtractPlugin(),
  // Generate HTML files
  ...pageNames.map(
    (page) =>
      new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `./src/${page}.html`,
      })
  ),
];

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|mp4)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [...plugins,
    new Dotenv()
  ], 
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  devtool: 'eval-source-map',
};
