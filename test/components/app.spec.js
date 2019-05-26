import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'

import App from '../../public/js/src/components/app'
import AppHeader from '../../public/js/src/components/app-header'
import Board from '../../public/js/src/components/board'

describe('components:App', () => {
	it('Should a move() method', () => {
		(typeof App.methods.move).should.equal('function');
	});

	let wrapper = mount(App);

	it('Should have app-header & board components', () => {
		App.components['app-header'].should.be.an.instanceOf(Object);
		App.components['board'].should.be.an.instanceOf(Object);
	});

	it('Should render correctly with initial state', () => {
		wrapper.findAll('#board').length.should.equal(1);
		wrapper.findAll('.cell').length.should.equal(9);
		wrapper.findAll('.cell-empty').length.should.equal(8);
		wrapper.findAll('.cell-cross').length.should.equal(1);
		wrapper.vm.cells.should.be.an.instanceOf(Array);
		wrapper.vm.cells.length.should.equal(9);
	});

	it('Should handle click', () => {
		wrapper.findAll('.cell').at(0).trigger('click');
		wrapper.findAll('.cell-empty').length.should.equal(6);
		wrapper.findAll('.cell-circle').length.should.equal(1);
		wrapper.vm.cells[0].value.should.equal(1);
	});

	it('Should handle wrong move value', () => {
		wrapper.find(Board).vm.move(10);
	});
});
