const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/App.jsx',

  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      /**
       * for using react-datepicker default styles,
       * it needs style-loader & css-loader
       *
       * */
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.pug',
      filename: 'index.html',
      inject: 'head',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    compress: true,
    watchContentBase: true,
    historyApiFallback: true,
  }
}

module.exports = config;
