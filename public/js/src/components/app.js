import Core from '../Core'
import Config from '../Config'

import AppHeader from './app-header'
import Board from './board'

let game = Core.getInstance();

export default {
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
	data: function() {
		return {
			cells: game.getBoard().map((actor, i) => {
				return { id: i, value: actor };
			})
		};
	},
	components: {
		'app-header': AppHeader,
		'board': Board
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
}