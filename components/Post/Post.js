var React = require('react');
var html = React.DOM;
var div = html.div;
var a = html.a;

module.exports = function(app) {

	function postClicked(e) {
		e.preventDefault();
		app.notify('post:clicked', { id: this.props.post.id });
	}

	return {
		render: function() {
			var post = this.props.post;

			return (
				div({ className: 'Post' },
					a({
						className: 'Post-title',
						href: 'http://example.com/',
						onClick: postClicked.bind(this),
					}, post.title),
					div({ className: 'Post-content' }, post.content)
				)
			);
		}
	};
}