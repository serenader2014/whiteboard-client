const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // devtool: 'cheap-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index'
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      title: 'Whiteboard Admin',
      template: './index.ejs'
    }),
  ]
}
