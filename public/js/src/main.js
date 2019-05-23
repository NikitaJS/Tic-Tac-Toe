import Core from './Core'
import Config from './Config'


var game = new Core();
console.log(game.getBoard());

Vue.component('appheader', {
	beforeMount: function () {
		game.onNewTurn(() => {
			this.switchTurn();
		});
	},
	props: ['playerturn'],
	render() {
		var message = this.playerturn ?
			'This is your turn' :
			"This is AI's turn";
		return <div id="header">{ message }</div>
	},
	methods: {
		switchTurn: function () {
			this.playerturn = !this.playerturn;
		}
	}
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

Vue.component('board', {
	// el: '#board',
	beforeMount: function () {
		game.onCellChange((n, actor) => {
			this.setState(n, Config.getState(actor));
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
	props: ['cells'],
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

var app = new Vue({
	el: '#app',
	data: {
		cells: game.getBoard().map((actor, i) => {
			return { id: i, state: Config.getState(actor) };
		})
	},
	render() {
		return (
		    <div id="container">
		    	<appheader playerturn={game.isWaitingForPlayer()}></appheader>
				<board cells={this.cells}></board>
			</div>
		)
	}
});
