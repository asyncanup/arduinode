var express = require("express"),
    app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http);

var five = require("johnny-five"),
    board = new five.Board({
        repl: false
    });

app.use(express.static(__dirname + "/public"));

board.on("ready", function () {
    console.log("arduino ready");
    
    var joystick = new five.Joystick({
        pins: ["A0", "A1"],
        freq: 500
    });
    
    var prev = {};
    
    joystick.on("axismove", function (err, timestamp) {
        if (+this.fixed.x === 1) move("right");
        if (+this.fixed.x === 0) move("left");
        if (+this.fixed.y === 1) move("up");
        if (+this.fixed.y === 0) move("down");
        
        if (prev.x !== this.fixed.x || prev.y !== this.fixed.y) {
            prev.x = this.fixed.x;
            prev.y = this.fixed.y;
            console.log(prev);
        }
    });
});

function move(direction) {
    console.log(direction.toUpperCase());
    io.emit(direction);
}

http.listen(3000, function () {
    console.log("running on localhost:3000");
});
