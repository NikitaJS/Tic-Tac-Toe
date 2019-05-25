import Core from './Core'

import App from './components/app'

let game = Core.getInstance();

var app = new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
});

window.TTT_RESET = function () {
	game.reset();
};

window.TTT_MOVEMENT = function (n) {
	app.move(n);
};
