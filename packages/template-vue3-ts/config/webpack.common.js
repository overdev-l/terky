const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const webpack = require('webpack')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        clean: true
    },
    performance: { hints: false },
    module: {
        rules:[
            {
                oneOf:[
                    { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                            loader: 'sass-loader',
                            options: {
                                additionalData: '@use "@/styles/element-variarbles.scss" as *;'
                            }
                        }] },
                    { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
                    { test: /\.(jpe?g|svg|png)$/, type: 'asset', generator: { filename: 'static/img/[name].[hash:6][ext][query]' }, parser: { dataUrlCondition: { maxSize: 10 * 1024 } } },
                    { test: /\.(tff|woff|otf|ttf)$/, type: 'asset', generator: { filename: 'static/fonts/[name].[hash:6][ext][query]', }, parser: { dataUrlCondition: { maxSize: 8 * 1024, }, }, },
                    { test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, type: 'asset', parser: { dataUrlCondition: { maxSize: 8 * 1024, }, }, generator: { filename: 'static/medias/[name].[contenthash][ext]' } },
                    {
                        test: /\.(j|t)sx?$/,
                        use: [{
                            loader: 'babel-loader',
                        }],
                        exclude: /node_modules/,
                    }
                ]
            },
            { test: /.vue$/i, use: ['vue-loader'] }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new EslintWebpackPlugin({
            extensions: ['.js', '.vue', '.ts'],
            fix: true,
            cache: true,
            failOnError: true,
            emitError: true,
            quiet: true,
            exclude: 'node_modules',
            context: resolve(__dirname, '../src'),
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: '后台管理系统',
            favicon: './src/favicon.svg'
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver({
                importStyle: 'sass'
            })],
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
        }),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            '@': resolve(__dirname, '../src'),
        }
    }
}
