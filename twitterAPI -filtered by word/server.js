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