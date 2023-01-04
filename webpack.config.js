/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (_, configuration) => ({
  mode: configuration.mode,
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      IMAGE_URL: JSON.stringify(configuration.env.image || 'https://i.giphy.com/media/1uPiL9Amv5zkk/giphy.webp'),
      HEADER_COLOR: JSON.stringify(configuration.env.color || 'blue'),
    }),
  ],
  devServer: configuration.mode === 'development' ? {
    static: {
      directory: './dist',
    },
    compress: true,
    port: 8081,
  } : undefined,
});
