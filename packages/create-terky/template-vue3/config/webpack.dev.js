const { merge } = require('webpack-merge')
const { resolve } = require('path')
const config = require('./webpack.common')
module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  cache: {
    type: 'memory'
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/'
  },
  devServer: {
    port: 9000,
    compress: true,
    open: false,
    hot: true,
    historyApiFallback: true,
    client: {
      progress: false,
      logging: 'none'
    }
  }
})
