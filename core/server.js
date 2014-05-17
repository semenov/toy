var crossroads = require('crossroads');
var _ = require('underscore');
var express = require('express');

module.exports = {
	run: function() {
		var server = express();
		server.use(express.static(__dirname + '/../public'));

		server.use(function(req, res, next) {

			var router = crossroads.create();
			var routes = require('../app/routes');
			_.each(routes, function(url) {
				router.addRoute(url);
			});

			var url = req.url;

			router.routed.add(function() {
				res.sendfile('./public/index.html', { root: __dirname + '/..' });
			});

			router.bypassed.add(function() {
				next();
			});

			router.parse(url);

		});

		server.listen(3000);
	}
};