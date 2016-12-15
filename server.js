var fs, configurationFile;

//Get twitter configurations
configurationFile = 'public/config.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var express = require('express'),
	app     = express(),
	port    = process.env.PORT || 5000,
	server  = app.listen(port),
	io      = require('socket.io').listen(server);
var Twit = require('twit');
var chokidar = require('chokidar');

// Initialise a new Twit instance, keeping it global for now
T = new Twit(
{
	consumer_key: configuration.consumer_key,
	consumer_secret: configuration.consumer_secret,
	access_token: configuration.access_token,
	access_token_secret: configuration.access_token_secret,
	timeout_ms: 45*1000,
});

// Setup public directory
app.use(express.static(__dirname + '/public'));

var watcher = chokidar.watch('public/data/trends.txt',{
	persistent: true
});

watcher.on('change', function(path, stats){
	console.log('Trends updated.')
	io.sockets.emit('trends-changed', stats.ctime);
});


function createStream (keyword) {

	console.log("Search tweets for keyword: " + keyword);
	var stream = T.stream('statuses/filter', {track : keyword});

	stream.on('tweet', function (data) {
		var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};

		//Yay, got the tweets! Start emitting..
		io.sockets.emit('twitter-stream', tweet);
	});

	stream.on('connect', function () {
		console.log('Connected to twitter stream using keyword => ' + keyword);
	});

	stream.on('disconnect', function () {
		console.log('Disconnected from twitter stream using keyword => ' + keyword);
	});

	return stream;
}

var stream         = null,
	currentKeyword = null,
	currentSockets = 0;

io.sockets.on('connection', function (socket) {
	currentSockets++;
	socket.emit('connected', currentKeyword);
	console.log('Socket Connected');

	// If our currentKeyword has a value and we have no running stream
	if (currentKeyword !== null && stream === null) {
		stream = createStream(currentKeyword);
	}

	socket.on('disconnect', function () {
		currentSockets--;
		console.log('Socket Disconnected');

		if (stream !== null && currentSockets <= 0) {
			stream.stop();
			stream = null;
			currentSockets = 0;
			console.log('No active sockets, disconnecting from stream');
		}
	});

	socket.on('trend-clicked', function (keyword) {
		//Stop the current stream and start new for this keyword
		if (stream !== null) {
			stream.stop();
			console.log('Stream Stopped');
		}

		stream = createStream(keyword);

		currentKeyword = keyword; // Set the currentKeyword holder to the passed keyword

		console.log('Stream restarted with keyword => ' + currentKeyword); // Log a message
	});
});


console.log('App listening on port ' + port);