module.exports = function(app) {
	var actions = {
		post: function(params) {
			var id = params.id;
			console.log('Should show post #' + id);
		}
	};

	return actions;
};