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
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'material-ui']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'admin/[name].js',
    chunkFilename: 'admin/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
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
    new HtmlWebpackPlugin({
      title: 'Whiteboard Admin',
      template: './index.ejs'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8098'
    },
    port: 8097
  }
}
