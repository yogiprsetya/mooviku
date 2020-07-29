const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/pages/home/index.js',
    movie: './src/pages/movie/movie.js',
    genre: './src/pages/genre/genre.js',
    genredetail: './src/pages/genre-detail/genre-detail.js',
    find: './src/pages/find/find.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [

      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },

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
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
        use: ['file-loader']
      }

    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/movie/movie.html',
      inject: true,
      chunks: ['movie'],
      filename: 'movie.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/genre/genre.html',
      inject: true,
      chunks: ['genre'],
      filename: 'genre.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/genre-detail/genre-detail.html',
      inject: true,
      chunks: ['genredetail'],
      filename: 'genre-detail.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/find/find.html',
      inject: true,
      chunks: ['find'],
      filename: 'find.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    })
  ],

  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg'],
    alias: {
      apiConfig: path.resolve(__dirname, 'api.config.js'),
      '@': path.resolve(__dirname, 'src')
    }
  }
}