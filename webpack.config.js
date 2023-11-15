const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist/assets'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|mp4)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'disney.html',
      template: './src/disney.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'marvel.html',
      template: './src/marvel.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pixar.html',
      template: './src/pixar.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'starwars.html',
      template: './src/starwars.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'natgeo.html',
      template: './src/natgeo.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'movie-details.html',
      template: './src/movie-details.html'
    })

  ],
  devtool: 'eval-source-map',
  // watch: true,
}