import Core from '../Core'

let game = Core.getInstance();

export default {
	beforeMount: function () {
		game.onNewTurn(() => {
			this.switchTurn();
		});
	},
	props: ['initialTurn'],
	data: function () {
		return {
			turn: this.initialTurn
		};
	},
	render() {
		var message = this.turn ?
			'This is your turn' :
			"This is AI's turn";
		return <div id="header">{ message }</div>
	},
	methods: {
		switchTurn: function () {
			this.turn = !this.turn;
		}
	}
}
