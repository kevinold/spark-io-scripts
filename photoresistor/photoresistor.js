var Spark = require("spark-io");
var five = require("johnny-five"),
  board, photoresistor;

board = new Spark({
  token: process.env.SPARK_TOKEN,
  deviceId: process.env.SPARK_DEVICE_ID
});
//board = new five.Board();


/*board.on("ready", function() {*/
/*console.log("CONNECTED");*/

/*// Create a new `photoresistor` hardware instance.*/
/**//*photoresistor = new five.Sensor({*/
/**//*pin: "A2",*/
/**//*freq: 250*/
/**//*});*/
/*board.analogRead("A2", function(data) {*/
/*console.log(data);*/
/*});*/

/*// Inject the `sensor` hardware into*/
/*// the Repl instance's context;*/
/*// allows direct command line access*/
/*//board.repl.inject({*/
/*//  pot: photoresistor*/
/*//});*/

/*// "data" get the current reading from the photoresistor*/
/*photoresistor.on("data", function() {*/
/*console.log(this.value);*/
/*});*/
/*});*/

// References
//
// http://nakkaya.com/2009/10/29/connecting-a-photoresistor-to-an-arduino/
