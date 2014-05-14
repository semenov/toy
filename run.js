var React = require('react');

function run() {

	var appConstructor = require('./core/app');
	var app = appConstructor({
		rootDir: './'
	});

	var Root = app.component('Root');


	React.renderComponent(Root(), document.body);
}

document.addEventListener('DOMContentLoaded', run);