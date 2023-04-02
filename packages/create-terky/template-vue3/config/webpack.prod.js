const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { EsbuildPlugin } = require('esbuild-loader')
module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        css: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      minRemainingSize: 0,
      maxSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),
  ]
})
