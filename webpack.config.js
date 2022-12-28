// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, configuration) => ({
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: configuration.mode === 'development' ? {
    static: {
      directory: './dist',
    },
    compress: true,
    port: 8081,
  } : undefined,
});
