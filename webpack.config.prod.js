const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

module.exports = {
  entry: {
    app: './src/index',
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'material-ui', 'material-ui-icons', 'classnames']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'admin/[name].[chunkhash].js',
    chunkFilename: 'admin/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' }
        ]
      },
      { test: /\.(png|svg|jpg|jpeg|gif)$/, use: [{ loader: 'file-loader', options: { outputPath: 'admin/assets/images/' } }] }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
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
