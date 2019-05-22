/*
* @Author: bgressier
* @Date:   2019-05-20 11:36:23
* @Last Modified by:   bgressier
* @Last Modified time: 2019-05-20 12:05:37
*/

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public', {
	index: ['index.html']
}));
app.use(bodyParser.urlencoded({ extended: true }));

var api = express();

api.all('*', function (res, res) {
	res.send(200);
});

app.use('/api', api);

app.listen(3000);
console.log('Launching Tic-Tac-Toc app on port 3000');