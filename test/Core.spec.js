import Core from 'src/Core'
import Config from 'src/Config'

describe('Model:Core', () => {
	let game = Core.getInstance();
	before(() => {
		game.reset();
	});

	it('Should be initialised with correct state', () => {
		game.isWaitingForPlayer().should.be.true();
	});

	it('Should emit an event on cell change', (done) => {
		let emitted = false;
		game.onCellChange(() => {
			emitted = true;
		});
		game.setCell(0, Config.actors.PLAYER);
		setTimeout(() => {
			emitted.should.be.true();
			done();
		}, 50);
	});

	it('Should emit an event on turn switch', (done) => {
		let emitted = false;
		game.onNewTurn(() => {
			emitted = true;
		});
		game.switchTurn();
		setTimeout(() => {
			emitted.should.be.true();
			done();
		}, 50);
	});

	it('Should emit an event on reset', (done) => {
		let emitted = false;
		game.onReset(() => {
			emitted = true;
		});
		game.reset();
		setTimeout(() => {
			emitted.should.be.true();
			done();
		}, 50);
	});

	it('Should detect when board is full', () => {
		game.isBoardFull().should.be.false();
		game.setCell(0, Config.actors.COMPUTER);
		game.isBoardFull().should.be.false();
		game.setCell(1, Config.actors.PLAYER);
		game.isBoardFull().should.be.false();
		game.setCell(2, Config.actors.COMPUTER);
		game.isBoardFull().should.be.false();
		game.setCell(3, Config.actors.PLAYER);
		game.isBoardFull().should.be.false();
		game.setCell(4, Config.actors.COMPUTER);
		game.isBoardFull().should.be.false();
		game.setCell(5, Config.actors.PLAYER);
		game.isBoardFull().should.be.false();
		game.setCell(6, Config.actors.COMPUTER);
		game.isBoardFull().should.be.false();
		game.setCell(7, Config.actors.PLAYER);
		game.isBoardFull().should.be.false();
		game.setCell(8, Config.actors.COMPUTER);
		game.isBoardFull().should.be.true();
	});

	it('Should correctly detect whether somebody wins', () => {
		game.board = [1, 1, 1, 0, 0, 0, 0, 0, 0];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [0, 0, 0, -1, -1, -1, 0, 0, 0];
		game.getWinner().should.equal(-1);
		game.winner = null;
		game.board = [0, 0, 0, 0, 0, 0, 1, 1, 1];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [1, 0, 0, 1, 0, 0, 1, 0, 0];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [0, 1, 0, 0, 1, 0, 0, 1, 0];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [0, 0, 1, 0, 0, 1, 0, 0, 1];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [0, 0, 1, 0, 1, 0, 1, 0, 0];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [1, 0, 0, 0, 1, 0, 0, 0, 1];
		game.getWinner().should.equal(1);
		game.winner = null;
		game.board = [1, -1, 1, -1, 1, 0, 0, -1, 0];
		game.getWinner().should.equal(0);
	});
});
