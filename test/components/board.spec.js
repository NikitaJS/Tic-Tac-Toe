import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'

import Board from 'src/components/board'

describe('components:Board', () => {
	it('Should have a move() method', () => {
		(typeof Board.methods.move).should.equal('function');
	});

	it('Should render correctly with initial state', () => {
		let cells = [0, 0, 0, 0, -1, 0, 0, 0, 0].map((actor, i) => {
			return { id: i, value: actor };
		});
		let wrapper = mount(Board, { propsData: { cells } });
		wrapper.findAll('#board').length.should.equal(1);
		wrapper.findAll('.cell').length.should.equal(9);
		wrapper.findAll('.cell-empty').length.should.equal(8);
		wrapper.findAll('.cell-cross').length.should.equal(1);
	});
});

