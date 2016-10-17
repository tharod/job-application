require('babel-core/register')({
  presets: ['latest', 'react'],
});

var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.prod.config')
var path = require('path')
var express = require('express');
var requestHandler = require('./prodRequestHandler')

console.log("========requestHandler============", requestHandler)
// var qs = require("query-string")
// var cookieParser = require('cookie-parser')

var app = new express();
var port = process.env.PORT || 8080;
const publicPath = express.static(path.join(__dirname, './public'))
console.log("======path.join(__dirname, '../public')", path.join(__dirname, './public'))
app.use('/public', publicPath)
// app.use(express.static(__dirname + './public'));
// console.log("=======express.static(__dirname + './public')=======", express.static(__dirname + './public'))
var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
//   stats: {colors: true}
// }))

// app.use(webpackHotMiddleware(compiler))

//delete browser 
//Solving the issue http://stackoverflow.com/questions/30347722/importing-css-files-in-isomorphic-react-components
delete process.env.BROWSER;

app.use(requestHandler);

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})