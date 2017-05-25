var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template : __dirname + '/views/play.ejs',
  filename : __dirname + '/public/play.ejs',
  inject : 'body'
});

module.exports = {
  entry : ['whatwg-fetch',__dirname + '/views/index.js'],
  module : {
    loaders : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        loader : 'babel-loader'
      }
    ]
  },
  output : {
    filename : 'front_end.js',
    path : __dirname + '/public/static/javascripts'
  },
  plugins : [HtmlWebpackPluginConfig]
};
