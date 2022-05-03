//server.js
const express = require('express')
const app = express();

const server = app.listen(8000, () =>
    console.log("Server Port : 800")
)

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });


io.on('connection', socket => {
    console.log("Hand Shake Complete")
    socket.emit("Welcome to the room!")

    //each clent connected gets a unique ID
    // console.log(socket.id);

    //socket.broadcast will emit to all other clients besides the
    //client who is actually emitting
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    })
})