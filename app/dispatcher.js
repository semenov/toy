module.exports = function(app) {
	var dispatcher = {
		'post:clicked': function(params) {
			console.log('Post was clicked. Wow!');
			app.actions.post({ id: params.id })
		}
	};

	return dispatcher;
};