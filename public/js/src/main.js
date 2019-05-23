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

Vue.component('cell', {
	props: ['label'],
	render()  {
		return <div class={'cell-' + this.label}></div>
	}
})

Vue.component('cell-list', {
	props: ['cell'],
	render() {
		const inAttrs = { label: this.cell.state.label };
		return (
			<div vOn:click={() => this.$emit('click', this.cell.id)} class="cell"><cell {...{ attrs: inAttrs }}   ></cell></div>
		)
	}
});

var board = new Vue({
	el: '#board',
	data: {
		cells: game.getBoard().map((actor, i) => {
			return { id: i, state: Config.getState(actor) };
		})
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