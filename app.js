var process = require('process');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var config = {
	port: process.env.NODE_ENV === 'production' ? 80 : 3000
};

app.use(express.static(__dirname + '/public', {
	index: ['index.html']
}));
app.use(bodyParser.urlencoded({ extended: true }));

var api = express();

api.all('*', function (res, res) {
	res.send(200);
});

app.use('/api', api);

app.listen(config.port);
console.log('Launching Tic-Tac-Toc app on port ' + config.port);