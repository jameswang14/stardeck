const path = require('path');

module.exports = [
  {
    entry: './public/scripts/main.js',
    resolve: {
      modules:[
          path.resolve('./node_modules'),
          path.resolve('./public/scripts'),
      ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve('./public/dist')
    },
  },
  {
    entry: './app.js',
    module: {
      rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['env']
            }
          }
        }
      ]
    },
    resolve: {
      modules: [
        path.resolve('./node_modules'),
      ]
    },
    output: {
      filename: 'bundleServer.js',
      path: path.resolve('./dist')
    },
    node: {
      fs: "empty",
      net: "empty"
    },
  }
]