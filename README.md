# Tic-Tac-Toe
Sample Tic Tac Toe single page app


## To Begin
1. Check global dependencies:
	``` Bash
	$ node --version
	v8.11.3
	$ npm --version
	5.6.0
	$ bower --version
	1.8.2
	$ gulp --version
	CLI version: 2.2.0
	```

2. Install it:
	``` Bash
	$ npm install
	```

3. Test it:
	``` Bash
	$ npm test
	```

4. Launch it:
	``` Bash
	$ npm run start
	```


## Global functions
1. Reset game:
	```JavaScript
	window.TTT_RESET();
	```
2. Make a player move:
	Every cell is identified by an integer between 0 and 8 (included)
	```JavaScript
	window.TTT_MOVEMENT(0);
	```
