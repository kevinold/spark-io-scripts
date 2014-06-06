var Spark = require("spark-io");
var five = require("johnny-five");
var _ = require("lodash");
var board = new Spark({
  token: process.env.SPARK_TOKEN,
  deviceId: process.env.SPARK_DEVICE_ID
});

//require the Twilio module and create a REST client
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

board.on("ready", function() {
  console.log("CONNECTED");

  var send = _.once(function(f) { sendTemp(f) });
  board.analogRead("A7", function(data) {
    var voltage = (data * 3.3)/1023;
    var celsius = (voltage - 0.5) * 100;
    var f = celsius * (9/5) + 32;  // true c to f forumula

    send(f);
  });

});

function sendTemp(f) {
  //Send an SMS text message
  client.sendMessage({

    to: process.env.TWILIO_TO_NUM,
    from: process.env.TWILIO_FROM_NUM,
    body: 'Temp is: ' + f

  }, function(err, responseData) {
    if (!err) {
      console.log(responseData.from);
      console.log(responseData.body);
    }
    process.exit(0); // only run once
  });
}
