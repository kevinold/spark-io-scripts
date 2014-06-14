var Spark = require("spark-io");
var five = require("johnny-five");
var _ = require("lodash");
var board = new Spark({
  token: process.env.SPARK_TOKEN,
  deviceId: process.env.SPARK_DEVICE_ID
});

board.on("ready", function() {
  console.log("CONNECTED");

  board.analogRead("A7", function(data) {
    console.log( "A7",  data );
    var voltage = (data * 3.33)/1023;
    var celsius = (voltage - 0.5) * 100;
    var f = celsius * (9/5) + 32;  // true c to f forumula
    //f = f + 29; // hack to get sensor working (add 29 so it is correct)

    console.log( "The temperature is: ", f);
  });

});

