    var ws = new WebSocket('ws://127.0.0.1:1337');
    const count = document.getElementById('count');
    ws.onopen = function(){
      console.log('WebSocket connection is open...');
      ws.send('message to server');
    };
    ws.onmessage = function(e){
      console.log('received:', e.data);
       
    count.innerHTML += e.data += '<br>';      
    };
    ws.onclose = function(){
      console.log('WebSocket has disconnected');
    };
