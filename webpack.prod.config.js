const path = require('path');
const webpack = require('webpack');

// const PATHS = {
//   build: path.join(__dirname, 'build'),
//   src: path.join(__dirname, 'src')
// };

module.exports = {
  devtool: 'source-map',
  entry: [
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  module: {
   
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
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
  
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    //global variable plugins
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://localhost:3000"),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};


