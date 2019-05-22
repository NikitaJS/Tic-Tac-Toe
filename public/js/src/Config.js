export default class Config {
	static actors = {
		COMPUTER: -1,
		PLAYER: 1
	};

	static states = {
		EMPTY:  { value: 0, label: 'empty' },
		CROSS:  { value: Config.actors.COMPUTER, label: 'cross' },
		CIRCLE: { value: Config.actors.PLAYER, label: 'circle' }
	};

	static getState(actor) {
		switch (actor) {
			case 0:
				return Config.states.EMPTY;
			case Config.actors.COMPUTER:
				return Config.states.CROSS;
			case Config.actors.PLAYER:
				return Config.states.CIRCLE;
		}
	}
}
