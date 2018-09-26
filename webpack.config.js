const path = require('path')
const fs = require('fs')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'index': './src/app/index'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          fs.realpathSync(path.resolve(__dirname, 'src'))
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public', 'bundle/'),
    filename: '[name].bundle.js'
  }
}
