const path = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
};

module.exports = {
  devtool: 'source-map',
  entry: [
    'whatwg-fetch',
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
      loader: 'babel',
      query: {
        'plugins': ['lodash'],
        presets: [ 'latest', 'react', 'react-hmre' ]
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
   

    { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }

    ]
  },
  
  devServer: {
    contentBase: PATHS.build,
    hot: true,      
    inline: true,
    progress: true,
    stats: { colors: true },
  },
  plugins: [
    new LodashModuleReplacementPlugin,
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


