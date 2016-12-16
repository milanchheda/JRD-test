
var socket = io('http://35.165.169.65:5000',{transports: ['websocket'], upgrade: false});
$(document).ready(function (){
	$(".lastUpdatedOn").text(new Date());
	getTrends();

	$('#trends-container').on("click", ".trends_link", function(){
		if($("#tweets-posts .post").length > 0) {
			$("#tweets-posts").html('');
		}
		$("#overlay").show().html('<div class="loadingMessage">Getting the latest tweets, just for you. Hold tight...</div>');

    	$("#selected-trend").text($(this).text());
    	socket.emit('trend-clicked', 'channel-'+($(this).index()+1));
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

	$("#tweets-posts").html($(".post").get().reverse());
});

function getTrends() {
	$.get('data/trends.txt', function(data){
		var lines = data.split("\n");
		len = lines.length;
        for (var i = 0;  i < 20; i++) {
        	liHtml = "<li class='trends_link'>"+lines[i]+"</li>";
        	if($.trim(lines[i]) != '')
            	$("#trends-container ul").append(liHtml);
        }
	});
}
