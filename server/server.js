//server.js
const express = require('express')
const app = express();

const server = app.listen(8000, () =>
    console.log("Server Port : 8000")
)

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true } );


io.on('connection', socket => {
    console.log("Nice to meet you. (HandShake)");

    socket.emit("Welcome to the room!")

    //socket.on GET
    socket.on("message", data => {
        //Sends message to all clients EXCEPT sender
        // socket.broadcast.emit("chat", data);

        socket.emit("chat", data)

    })
})