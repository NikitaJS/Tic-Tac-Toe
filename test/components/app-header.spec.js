import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'

import Core from 'src/Core'
import AppHeader from 'src/components/app-header'

describe('components:AppHeader', () => {
	let game = Core.getInstance();
	before(() => {
		game.reset();
	});

	it('Should have a reset() method', () => {
		(typeof AppHeader.methods.reset).should.equal('function');
	});

	let wrapper = mount(AppHeader, { attrs: { initialTurn: true } } );

	it('Should be initialised correctly', () => {
		wrapper.vm.turn.should.be.true();
		should(wrapper.vm.done).equal(null);
	});

	it('Should display restart button upon game termination', (done) => {
		game.emitDone();
		setTimeout(() => {
			wrapper.vm.done.should.equal(0);
			done();
		}, 50);
	});

	it('Should handle click on restart button and return to initial state', (done) => {
		wrapper.vm.turn = false;
		wrapper.find('button').trigger('click');
		setTimeout(() => {
			wrapper.vm.turn.should.be.true();
			should(wrapper.vm.done).equal(null);
			done();			
		}, 50);
	});

	it('Should switch turn according to Core instance', (done) => {
		game.switchTurn();
		setTimeout(() => {
			wrapper.vm.turn.should.be.false();
			done();
		}, 50);
	});
});