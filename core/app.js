var React = require('react');

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

			component = React.createClass(componentDeclaration);
			components[componentName] = component;

			return component;
		},

		require: function(path) {
			return require(rootDir + path + '.js');
		}
	};

	return app;
};