import Core from './Core'
import Config from './Config'

import AppHeader from './components/app-header'
import Cell from './components/cell'
import CellList from './components/cell-list'
import Board from './components/board'

let game = Core.getInstance();

Vue.component('app-header', AppHeader);
Vue.component('cell', Cell);
Vue.component('cell-list', CellList);
Vue.component('board', Board);

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
		    	<app-header initialTurn={game.isWaitingForPlayer()}></app-header>
				<board cells={this.cells}></board>
			</div>
		)
	}
});
