const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './api/src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'server')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
