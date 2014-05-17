var React = require('react');

function run() {

	var appConstructor = require('./core/app');
	var app = appConstructor({
		rootDir: './'
	});

	var Root = app.component('Root');

	React.renderComponent(Root(), document.body);

	function go() {
		var url = document.location.pathname;
		console.log('I see url', url);
		app.router.go(url);
	}

	window.onpopstate = go;

	go();
}

document.addEventListener('DOMContentLoaded', run);