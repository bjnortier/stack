const path = require('path')
const fs = require('fs')

const mode = process.env.NODE_ENV || 'development'

const config = {
  mode,
  entry: {
    'index': [
      path.resolve(__dirname, './src/app/index')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        include: [
          fs.realpathSync(path.resolve(__dirname, 'src'))
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'static', 'bundles/'),
    filename: '[name].bundle.js',
    publicPath: '/bundles'
  },
  plugins: []
}

module.exports = config
