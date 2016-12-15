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

console.log('App listening on port ' + port);