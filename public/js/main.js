var socket = io();

socket.on("left", Reveal.left);
socket.on("right", Reveal.right);
socket.on("up", Reveal.up);
socket.on("down", Reveal.down);
