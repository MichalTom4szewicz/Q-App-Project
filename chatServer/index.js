const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');


const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};
let cs = {}

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log('New connection:' + request.origin + '.')

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('Connected: ' + userID ); //+ ' in ' + Object.getOwnPropertyNames(clients)
  // connection.sendUTF("{\"type\":\"howdy\",\"msg\":\"papa\"}")
  // connection.sendUTF(`{"type":"id","id":${userID}}`)

  // setTimeout(() => {
  //   const hi = JSON.stringify({
  //     type: "id",
  //     id: userID,
  //     msg: "yid"
  //   })
  //   connection.sendUTF(hi)
  // }, 2000);



  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Message: ', message.utf8Data, typeof(message.utf8Data));

      const data = JSON.parse(message.utf8Data);

      // if(data.type === 'nameid') {
      //   console.log('hej', data.name, data.id)
      // }

      // if(data.type === 'howdy') {
      //   console.log('yeehow')
      //   console.log(request.origin)
      //   cs[request.origin]

      // }

      // broadcasting message to all connected clients
      for(key in clients) {
        clients[key].sendUTF(message.utf8Data);
        // console.log('sent Message to all');
      }
    }
  })
});