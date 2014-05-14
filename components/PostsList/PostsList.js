var React = require('react');
var html = React.DOM;

module.exports = function(app) {
	var Post = app.component('Post');

	return {
		render: function() {
			var postComponents = this.props.posts.map(function(post) {
				post.key = post.id;
				return Post(post);
			});

			return html.div({ className: 'PostsList'}, postComponents);
		}
	};
};
