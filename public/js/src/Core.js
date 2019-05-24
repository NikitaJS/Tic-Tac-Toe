import Config from './Config'

let _instance;

export default {
	getInstance() {
		if (!_instance) {
			_instance = new Core();
		}
		return _instance;
	}
}

class Core {
	constructor() {
		this.board = [0, 0, 0, 0, Config.actors.COMPUTER, 0, 0, 0, 0];
		this.waitingForPlayer = true;
		this.newTurnListeners = [];
		this.cellChangeListeners = [];
		this.resetListeners = [];
	}

	isWaitingForPlayer() {
		return this.waitingForPlayer;
	}

	isBoardFull() {
		return (this.board.indexOf(0) < 0);
	}

	getWinner() {
		return this._detectWinner(this.board);
	}

	reset() {
		this.board = [0, 0, 0, 0, Config.actors.COMPUTER, 0, 0, 0, 0];
		this.waitingForPlayer = true;
		this.emitReset();
		return this;
	}

	emitReset() {
		this.resetListeners.forEach((listener) => {
			listener();
		});
		return this;
	}

	onReset(listener) {
		this.resetListeners.push(listener);
		return this;
	}

	switchTurn() {
		this.waitingForPlayer = !this.waitingForPlayer;
		this.emitNewTurn();
		return this;
	}

	emitNewTurn() {
		this.newTurnListeners.forEach((listener) => {
			listener();
		});
		return this;
	}

	onNewTurn(listener) {
		this.newTurnListeners.push(listener);
		return this;
	}

	setCell(n, actor) {
		if (n < 0 || n >= this.board.length) {
			return console.error(new RangeError('Value ' + n + ' is out of bounds'));
		}
		this.board[n] = actor;
		this.emitCellChange(n, actor);
		return this;
	}

	getCell(n) {
		if (n < 0 || n >= this.board.length) {
			return console.error(new RangeError('Value ' + n + ' is out of bounds'));
		}
		return this.board[n];
	}

	emitCellChange(n, actor) {
		this.cellChangeListeners.forEach((listener) => {
			listener(n, actor);
		});
		return this;
	}

	onCellChange(listener) {
		this.cellChangeListeners.push(listener);
		return this;
	}

	getBoard() {
		return this.board;
	}

	_detectWinner(m) {
		var lsum;
		if (Math.abs((lsum = m[0] + m[1] + m[2])) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[3] + m[4] + m[5]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[6] + m[7] + m[8]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[0] + m[3] + m[6]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[1] + m[4] + m[7]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[2] + m[5] + m[8]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[0] + m[4] + m[8]) == 3)
			return lsum / 3;
		else if (Math.abs(lsum = m[2] + m[4] + m[6]) == 3)
			return lsum / 3;
		return 0;
	}

	_evalBestMove(board, actor, depth) {
		if (depth == null)
			depth = 0;
		var winner = this._detectWinner(board);
		if (winner) {
			return { score: winner * (100 - depth), n: null };
		}
		if (board.indexOf(0) < 0)
			return { score: 0, n: null };
		var moves = [];
		var nextBoard = board.slice(0);
		for (var i = 0, l = board.length; i < l; i++) {
			if (board[i] === 0) {
				nextBoard[i] = actor;
				let next = this._evalBestMove(nextBoard, -1 * actor, depth + 1);
				nextBoard[i] = 0;
				let move = {
					n: i,
					score: next.score
				};
				moves.push(move);
			}
		}
		var best = {
			score: -10000 * actor
		};
		if (actor === Config.actors.COMPUTER) {
			moves.forEach((move, i) => {
				if (move.score < best.score) {
					best.score = move.score;
					best.n = i;
				}
			});
		}
		else {
			moves.forEach((move, i) => {
				if (move.score > best.score) {
					best.score = move.score;
					best.n = i;
				}
			});

		}
		return moves[best.n];
	}

	aiBestMove() {
		return this._evalBestMove(this.board, Config.actors.COMPUTER);
	}
}