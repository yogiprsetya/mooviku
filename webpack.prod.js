const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const CopyWebpackPlugin = require("copy-webpack-plugin");
 
module.exports = merge(config, {
  mode: 'production',

  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    })
  ],
  
  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
})