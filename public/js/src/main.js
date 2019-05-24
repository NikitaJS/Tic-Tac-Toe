import Core from './Core'
import Config from './Config'

import AppHeader from './components/app-header'
import Cell from './components/cell'
import CellList from './components/cell-list'
import Board from './components/board'

let game = Core.getInstance();

Vue.component('app-header', AppHeader);
Vue.component('board', Board);
Vue.component('cell-list', CellList);
Vue.component('cell', Cell);

var app = new Vue({
	el: '#app',
	created: function () {
		game.onCellChange((n, actor) => {
			this.cells[n].value = actor;
		});
		game.onReset(() => {
			this.cells = game.getBoard().map((actor, i) => {
				return { id: i, value: actor };
			});
		});
	},
	data: {
		cells: game.getBoard().map((actor, i) => {
			return { id: i, value: actor };
		})
	},
	render() {
		return (
		    <div id="container">
		    	<app-header initialTurn={game.isWaitingForPlayer()}></app-header>
				<board ref="board" cells={this.cells}></board>
			</div>
		)
	},
	methods: {
		move: function (n) {
			if (game.isWaitingForPlayer() && game.getCell(n) == 0) {
				game.switchTurn();
				game.setCell(n, Config.actors.PLAYER);
				let move = game.aiBestMove();
				console.log('Next move: ', move);
				if (move.n != null) {
					game.setCell(move.n, Config.actors.COMPUTER);
					let winner;
					if (winner = game.getWinner()) {
						console.log('[Result] Winner: ', winner);
						return;
					}
					if (game.isBoardFull()) {
						console.log('[Result] DRAW');
						return;
					}
					game.switchTurn();
				}
			}
		}
	}
});

window.TTT_RESET = function () {
	game.reset();
};

window.TTT_MOVEMENT = function (n) {
	app.move(n);
};
