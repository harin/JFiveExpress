var five = require("johnny-five");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Expose public folder static files
app.use("/public", express.static(path.join(__dirname, 'public')));

// route to index.html
app.get('/', function (req, res) {
	res.sendfile('index.html');
});


var server = http.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

var board = new five.Board();
var led;

board.on("ready", function() {
  	console.log("Ready event. Repl instance auto-initialized!");
	led = new five.Led(13);
});

io.on('connection', function (socket) {
	console.log("a user connected");
	socket.on('on', function (data) {
		console.log('turning led on');
		if (board.isReady) {
			led.on();
		}
	});
	socket.on('off', function (data) {
		console.log('turning led off');
		if (board.isReady) {
			led.off();
		}
  	});
});