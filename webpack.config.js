const path = require('path');

module.exports = {
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
  }
};