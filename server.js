// var fs, configurationFile;
// var TWEETS_BUFFER_SIZE = 2;
// var tweetsBuffer = [];

// //Get twitter configurations
// configurationFile = 'public/config.json';
fs = require('fs');

// var configuration = JSON.parse(
//     fs.readFileSync(configurationFile)
// );

var express = require('express'),
	app     = express(),
	port    = process.env.PORT || 5000,
	server  = app.listen(port),
	io      = require('socket.io').listen(server);
// var Twit = require('twit');
var chokidar = require('chokidar');

// // Initialise a new Twit instance, keeping it global for now
// T = new Twit(
// {
// 	consumer_key: configuration.consumer_key,
// 	consumer_secret: configuration.consumer_secret,
// 	access_token: configuration.access_token,
// 	access_token_secret: configuration.access_token_secret,
// 	timeout_ms: 45*1000,
// });

// // Setup public directory
app.use(express.static(__dirname + '/public'));

var watcher = chokidar.watch('public/data/trends.txt',{
	persistent: true
});

watcher.on('change', function(path, stats){
    stream.stop();//closes the stream connected to Twitter
	console.log('>stream closed after 100 seconds');
	var channels = getNewChannels();
	stream = client.streamChannels({track:channels});
	// console.log('Trends updated.')
	// io.sockets.emit('trends-changed', stats.ctime);
});

function getNewChannels() {

	var trendsArray = [];
	var obj = {};
	var getTrends = fs.readFileSync('public/data/trends.txt', 'utf8');
	trendsArray = getTrends.toString().split('\n');
	var count = 1;
	trendsArray.forEach(function(data){
		if(data != ''){
			obj['channel-' + count] = [data];
	    	count++;
		}
	});

	return obj;
}


var stream         = [],
	connectedUsersOnStream = [],
	currentKeyword = null,
	currentSockets = 0;

io.sockets.on('connection', function (socket) {
	currentSockets++;
	socket.emit('connected', currentKeyword);
	console.log('Socket Connected');




	socket.on('leaveRoom', function (keyword) {
		console.log('Leaving room' + keyword);
		connectedUsersOnStream[keyword] = connectedUsersOnStream[keyword] - 1;
		//socket.leave(keyword);
	});




	socket.on('trend-clicked', function (keyword) {

		if(!connectedUsersOnStream[keyword]) {
			connectedUsersOnStream[keyword] = 1;
		}else{
			connectedUsersOnStream[keyword]= connectedUsersOnStream[keyword]+1;
		}
		console.log(connectedUsersOnStream);
		//socket.join(keyword);
		console.log('Stream restarted with keyword => ' + keyword); // Log a message
	});
});


// console.log('App listening on port ' + port);

var TwitterStreamChannels = require('twitter-stream-channels');
var credentials = require('./public/config.json');

var client = new TwitterStreamChannels(credentials);

var channels = getNewChannels();

var stream = client.streamChannels({track:channels});
// console.log(channels);
// for(var i = 1; i < 20; i++) {
// 	console.log('channels/channel-'+(i));
// 	stream.on('channels/channel-'+(i),function(tweet){
// 		if(connectedUsersOnStream['channel-' + (i)]>0){
// 			console.log('>languages' + (i) + ': ' + tweet);
// 		}
// 	});
// }

stream.on('channels/channel-1',function(data){
    if(connectedUsersOnStream['channel-1']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);

	}
});
stream.on('channels/channel-2',function(data){
    if(connectedUsersOnStream['channel-2']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);

	}
});
stream.on('channels/channel-3',function(data){
    if(connectedUsersOnStream['channel-3']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);

	}
});

stream.on('channels/channel-4',function(data){
    if(connectedUsersOnStream['channel-4']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);

	}
});
stream.on('channels/channel-5',function(data){
    if(connectedUsersOnStream['channel-5']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-6',function(data){
    if(connectedUsersOnStream['channel-6']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-7',function(data){
    if(connectedUsersOnStream['channel-7']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-8',function(data){
    if(connectedUsersOnStream['channel-8']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-9',function(data){
    if(connectedUsersOnStream['channel-9']>0){
		var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-10',function(data){
    if(connectedUsersOnStream['channel-10']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-11',function(data){
    if(connectedUsersOnStream['channel-11']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-12',function(data){
    if(connectedUsersOnStream['channel-12']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-13',function(data){
    if(connectedUsersOnStream['channel-13']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-14',function(data){
    if(connectedUsersOnStream['channel-14']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-15',function(data){
    if(connectedUsersOnStream['channel-15']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-16',function(data){
    if(connectedUsersOnStream['channel-16']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-17',function(data){
    if(connectedUsersOnStream['channel-17']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-18',function(data){
    if(connectedUsersOnStream['channel-18']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-19',function(data){
    if(connectedUsersOnStream['channel-19']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});
stream.on('channels/channel-20',function(data){
    if(connectedUsersOnStream['channel-20']>0){
    	var tweet = {"text" : data.text, "name" : data.user.screen_name, "image":data.user.profile_image_url};
    	io.sockets.emit('twitter-stream', tweet);
	}
});

// setTimeout(function(){
//     stream.stop();//closes the stream connected to Twitter
//     console.log('>stream closed after 100 seconds');
// },10000);