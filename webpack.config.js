const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const Webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)

const loadersJS = () => {
  const loaders = ['babel-loader']
  if (isDev) loaders.push('eslint-loader')
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@core': path.resolve(__dirname, './src/core/'),
    },
  },
  module: {
    // order is important, loaders work from right-to-left
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtract.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: loadersJS(),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: 'index.html',
      minify: { removeComments: !isDev, collapseWhitespace: !isDev },
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtract({ filename: filename('css') }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
}
