/*
* @Author: mark
* @Date:   2017-09-25 17:22:12
* @Last Modified by:   mark
* @Last Modified time: 2017-09-27 09:52:31
*/

var http = require('http');
var express = require('express');
var app = express();

app.use(require('morgan')('short'));

(function(){

	var webpack = require('webpack');
	var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config.js')('env');
	var compiler = webpack(webpackConfig);

	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	app.use(
		require("webpack-hot-middleware")(compiler, {
	    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));

})()


app.get("/", function(req, res) {
 	res.sendFile(__dirname + '/src/index.html');
});


if (require.main === module) {
	var server = http.createServer(app);
	server.listen(process.env.PORT || 8883, function() {
		console.log("Listening on %j", server.address());
	});
}
