
var socket = io('http://localhost:5000',{transports: ['websocket'], upgrade: false});
$(document).ready(function (){
	clickedCount = 1;
	$(".lastUpdatedOn").text(new Date());
	getTrends();

	$('#trends-container').on("click", ".trends_link", function(){
		// if(clickedCount==3){
		// 	socket.emit('leaveRoom', 'channel-3');
		// 	clickedCount = 1;
		// }else{
		// 	if(clickedCount>1)
		// 		socket.emit('leaveRoom', 'channel-'+(clickedCount-1));
		// }
		// var prevTrend = $("#selected-trend").text();
		if($("#tweets-posts .post").length > 0) {
			$("#tweets-posts").html('');
		}
		$("#overlay").show().html('<div class="loadingMessage">Getting the latest tweets, just for you. Hold tight...</div>');

    	$("#selected-trend").text($(this).text());
    	socket.emit('trend-clicked', 'channel-'+($(this).index()+1));
    	clickedCount++;

    });
});

socket.on('trends-changed',function(updateTime){
	var localDate = new Date(updateTime);
	$(".lastUpdatedOn").text("Trends last updated on: <b>" + localDate + "</b>");
	getTrends();
});

socket.on('twitter-stream',function(data){
	$("#overlay").hide();

		tweets = "<section class='post'>" +
		    "<header class='post-header'>" +
		        "<img class='post-avatar' height='52' width='52' src='"+data.image+"'>" +
		        "<h4 class='post-user ng-binding'>" + data.name + "</h4>" +
		        "<h5 class='ng-binding'>"+data.text+"</h5>" +
		    "</header>" +
		"</section>";
		$("#tweets-posts").append(tweets);

	// $("#tweets-posts").append($(".post").get().reverse());
});

function getTrends() {
	$.get('data/trends.txt', function(data){
		var lines = data.split("\n");
		len = lines.length;
        for (var i = 1;  i < 20; i++) {
        	liHtml = "<li class='trends_link'>"+lines[i]+"</li>";
        	if($.trim(lines[i]) != '')
            	$("#trends-container ul").append(liHtml);
        }
	});
}
