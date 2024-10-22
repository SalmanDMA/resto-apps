const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    detail: path.resolve(__dirname, 'src/scripts/detail.js'),
    favorite: path.resolve(__dirname, 'src/scripts/favorite.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['app'],
    }),

    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/templates/detail.html'),
      chunks: ['detail'],
    }),

    // HTML untuk halaman favorite
    new HtmlWebpackPlugin({
      filename: 'favorite.html',
      template: path.resolve(__dirname, 'src/templates/favorite.html'),
      chunks: ['favorite'],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
