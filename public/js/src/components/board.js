import Core from '../Core'
import Config from '../Config'

let game = Core.getInstance();

export default {
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
		move: function (n) {
			return this.$parent.move(n);
		}
	}
}