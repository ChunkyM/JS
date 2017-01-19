const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 1337});
let counter = 0;
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
      console.log('received from client: ', message);
      
  });
  ws.on('close', function(){
      console.log('Client disconnected');
  });
});
console.log('WebSocket server listening for connection...');

setInterval(function(){
    wss.broadcast(`${counter}`);
    counter++;
},1000)
var OAuth = require('oauth').OAuth;

const consumer_key = "0EqSxXWOTTda2fBjvYv56ljdW",
    consumer_secret = "YxM7qBlHGiQtXFdcX5lBBh99zM0y9hlGdp13fkvcinNeYZCGRS",
    access_token = "525840019-OTXEnYyIKzcXxDBsLmiiE4qonLkIUoQ7YPVgJLyS",
    access_token_secret = "GiPJ8TINKLhO2cs6dHZfxzrLgKiCl2zQpV0reMvZJ0StJ";

const twitter_oauth = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token", 
	consumer_key,
	consumer_secret,
	"1.0A",
	null,
	"HMAC-SHA1"
);
const request = twitter_oauth.get(
	"https://stream.twitter.com/1.1/statuses/filter.json?track=snow",
	access_token,
	access_token_secret
    
);
var message = "";


request.on("response", function(response) {
    response.setEncoding("utf8");
    response.on("data", function(chunk) {
        message += chunk;
        var cr_index= message.indexOf('\r');
        if (cr_index !== -1) {
	var tweet_payload = message.slice(0, cr_index);
	var tweet = JSON.parse(tweet_payload);
	if(tweet.text){
		console.log("@" + tweet.user.screen_name + ": " + tweet.text);
        wss.broadcast("@" + tweet.user.screen_name + ": " + tweet.text);
	} else {
		// Pay attention - this could be a deletion notice
		console.log(tweet);
	}
}

            message = message.slice(cr_index + 1);
    });
    response.on("end", function () {
        console.log("--- END ---");
    });
});
request.end();


