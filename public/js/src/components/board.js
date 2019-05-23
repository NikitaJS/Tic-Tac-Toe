import Core from '../Core'
import Config from '../Config'

let game = Core.getInstance();

export default {
	beforeMount: function () {
		game.onCellChange((n, actor) => {
			this.setState(n, Config.getState(actor));
		});
		game.onReset(() => {
			this.cells = game.getBoard().map((actor, i) => {
				return { id: i, state: Config.getState(actor) };
			});
		});
	},
	template: `<div id="board">
				<cell-list @click="move"
					v-for="cell in cells"
					v-bind:cell="cell"
					v-bind:key="cell.id"
				></cell-list>
			</div>
	`
	,
	props: ['initialBoard'],
	data: function () {
		return {
			cells: this.initialBoard.map((actor, i) => {
				return { id: i, state: Config.getState(actor) };
			})
		};
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
}