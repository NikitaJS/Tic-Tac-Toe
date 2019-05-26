import Core from '../Core'
import Config from '../Config'

let game = Core.getInstance();

export default {
	beforeMount: function () {
		game.onNewTurn(() => {
			this.switchTurn();
		});
		game.onReset(() => {
			this.turn = game.isWaitingForPlayer()
			this.done = null;
		});
		game.onDone(() => {
			this.done = game.getWinner();
		});
	},
	props: ['initialTurn'],
	data: function () {
		return {
			turn: this.initialTurn,
			done: null
		};
	},
	render() {
		if (this.done === null) {
			var message = this.turn ?
				'This is your turn' :
				"This is computer's turn";			
			return <div id="header">{ message }</div>
		}
		var message;
		switch (this.done) {
			case Config.actors.COMPUTER:
				message = 'Computer wins';
				break;
			case Config.actors.PLAYER:
				message = 'You win';
				break;
			default:
				message = 'Draw';
				break;
		}
		return <div id="header">{ message }<button vOn:click={this.reset} id="btn-restart">Restart</button></div>
	},
	methods: {
		reset: function () {
			game.reset();
		},
		switchTurn: function () {
			this.turn = !this.turn;
		}
	}
}
