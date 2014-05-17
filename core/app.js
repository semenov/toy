var React = require('react');
var _ = require('underscore');
var crossroads = require('crossroads');

module.exports = function(params) {
	var rootDir = params.rootDir;
	var components = {};
	var app = {
		component: function(componentName) {
			var component = components[componentName];

			if (component) {
				return component;
			}

			var componentPath = 'components/' + componentName + '/' + componentName;
			var componentConstructor = app.require(componentPath);
			var componentDeclaration = componentConstructor(app);
			componentDeclaration.displayName = componentName;

			component = React.createClass(componentDeclaration);
			components[componentName] = component;

			return component;
		},

		require: function(path) {
			return require(rootDir + path + '.js');
		},

		notify: function(eventName, params) {
			if (params == null) params = {};
			console.log('Notification', eventName, params);
			var subscriber = dispatcher[eventName];
			if (subscriber) subscriber(params);
		},

		router: {
			go: function(url) {
				console.log('app.router.go', url);
				router.parse(url);
			}
		},

		actions: {}
	};


	var router = crossroads.create();
	router.normalizeFn = function(request, vals) {
		var blacklist = ['request_', 'vals_', '0', '1', '2', '3', '4', '5'];
		var params = _.omit(vals, blacklist);
		return [params];
	};

	var routes = {};
	var routesMap = app.require('app/routes');
	_.each(routesMap, function(urlPattern, name) {
		routes[name] = router.addRoute(urlPattern, function(params) {
			console.log(urlPattern, params);
			var action = app.actions[name];
			action(params);
		});
	});

	var dispatcherConstructor = app.require('app/dispatcher');
	var dispatcher = dispatcherConstructor(app);

	var actionsConstructor = app.require('app/actions');
	var actions = actionsConstructor(app);

	_.each(actions, function(handler, key) {
		app.actions[key] = function(params) {
			var route = routes[key];
			var url = route.interpolate(params);
			pushState(url);
			handler(params);
		};
	});

	function pushState(url) {
		if (!window) return;
		if (url == document.location.pathname) return;

		history.pushState({}, null, url);
	}

	return app;
};