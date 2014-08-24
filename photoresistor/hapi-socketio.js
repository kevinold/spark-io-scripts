// The following initializes a socket.io server.
// The socket.io client JavaScript is located at http://localhost:8000/socket.io/socket.io.js
// To create a new socket.io handshake make a POST request to http://localhost:8000/socket.io/1
// use the resulting session ID for subsequent requests (see https://github.com/LearnBoost/socket.io-spec)
// For example, in the chrome debug console you can create a new WebSocket with the following URI
// 'ws://localhost:8080/socket.io/1/websocket/Ww4ULq6wOTUZYD62v3yu'
// where Ww4ULq6wOTUZYD62v3yu is the session ID

// Load modules

var Hapi = require('hapi');
var SocketIO = require('socket.io');

//require the Twilio module and create a REST client
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Declare internals

var internals = {};


internals.startServer = function () {

    var server = new Hapi.Server(3000);

    var helloHandler = function (request, reply) {
      reply.file('./index.html');
    };

    server.route({ method: 'GET', path: '/', handler: helloHandler });

    server.start(function () {

        var io = SocketIO.listen(server.listener);
        io.on('connection', function(socket) {
          
          socket.on('val.post', function(data) {
            socket.emit('val.render', data);
            if (data.result > 400) {
              client.sendMessage({

                to: process.env.TWILIO_TO_NUM,
                from: process.env.TWILIO_FROM_NUM,
                body: 'It is Dark' + data.result

              }, function(err, responseData) {
                if (!err) {
                  console.log(responseData.from);
                  console.log(responseData.body);
                }
              });
            }
          });

        });

    });
};


internals.startServer();
