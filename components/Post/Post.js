var React = require('react');
var html = React.DOM;

module.exports = function(app) {
	return {
		render: function() {
			return html.div({className: 'Post'},
				html.div({className: 'Post-title'}, this.props.title),
				html.div({className: 'Post-content'}, this.props.content)
			);
		}
	};
}