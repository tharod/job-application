const path = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
};

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
   
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
    ]
  },
  //http://stackoverflow.com/questions/29290301/cant-get-webpack-hot-module-replacement-to-work
  devServer: {
    contentBase: PATHS.build,
    hot: true,      
    inline: true,
    progress: true,
    stats: { colors: true },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //global variable plugins
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://localhost:3000"),
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};


