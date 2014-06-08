var five = require("johnny-five"),
    board = new five.Board();
    
board.on("ready", function () {
    console.log("board ready");
    
    var joystick = new five.Joystick({
        pins: ["A0", "A1"],
        freq: 500
    });
    
    board.repl.inject({
        joystick: joystick
    });
    
    joystick.on("axismove", function (err, timestamp) {
        console.log("LR: " + this.fixed.x);
        console.log("UD: " + this.fixed.y);
        console.log("MAG: " + this.magnitude);
    });
});
