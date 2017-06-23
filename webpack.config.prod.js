const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

module.exports = {
  entry: {
    app: './src/index',
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
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
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      title: 'Whiteboard Admin',
      template: './index.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
