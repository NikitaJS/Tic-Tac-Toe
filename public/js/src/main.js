import Core from './Core'
import Config from './Config'


var game = new Core();
console.log(game.getBoard());

var header = new Vue({
	el: '#header',
	data: {
		turn: game.isWaitingForPlayer()
	},
	methods: {
		switchTurn: function () {
			this.turn = !this.turn;
		}
	}
});

game.onNewTurn(() => {
	header.switchTurn();
});

var board = new Vue({
	el: '#board',
	data: {
		cells: game.getBoard().map((actor, i) => {
			return { id: i, state: Config.getState(actor) };
		})
	},
	components: {
		'cell-list': {
			props: ['cell'],
			template: '<div v-on:click="$emit(\'click\', cell.id)" :id="\'cell-\' + cell.id" class="cell"><div :class="\'cell-\' + cell.state.label"></div></div>',
		}
	},
	methods: {
		reset: function () {

		},
		setState: function (n, state) {
			if (n < 0 || n >= this.cells.length) {
				return console.error(new RangeError('Value ' + n + ' is out of bounds'));
			}
			this.cells[n].state = state;
			return this;
		},
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

game.onCellChange((n, actor) => {
	board.setState(n, Config.getState(actor));
});