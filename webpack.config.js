const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index'
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, exclude: /node_modules/, use:
        [
          { loader: 'style-loader' }, 
          { loader: 'css-loader', options: { importLoaders: 1}},
          { loader: 'postcss-loader' }
        ] }
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
