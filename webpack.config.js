// this file runs in the node environment, not in the browser, that's we can use a require statement and pull in a node library such as path
const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    // deprecated, use static:
    // watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use : [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  }
}