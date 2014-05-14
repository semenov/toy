var React = require('react');
var html = React.DOM;

module.exports = function(app) {
	var PostsList = app.component('PostsList');
	var data = app.require('components/PostsList/demo');

	return {
		render: function() {
			return html.div({className: 'App'},
				PostsList(data.common)
			);
		}
	};
};