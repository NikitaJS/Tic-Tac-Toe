import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'

import App from '../../public/js/src/components/app'
import AppHeader from '../../public/js/src/components/app-header'
import Board from '../../public/js/src/components/board'

describe('components:App', () => {
	it('Should a move() method', () => {
		(typeof App.methods.move).should.equal('function');
	});

	it('Should have app-header & board components', () => {
		App.components['app-header'].should.be.an.instanceOf(Object);
		App.components['board'].should.be.an.instanceOf(Object);
	});

	it('Should render correctly with initial state', () => {
		let wrapper = mount(App);
		wrapper.findAll('.cell').length.should.equal(9);
	});
});
