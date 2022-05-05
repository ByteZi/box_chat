//server.js
const express = require('express');
const app = express();
const server = require('http').Server(app)
const PORT = 8000
// const server = app.listen(8000, () => console.log("Server Port : 3000") )
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

server.listen(PORT, () => console.log("Port :",PORT))

let roomChat = {
    Games: [],
    Coding : []
}

io.on('connection', (socket) => {
    //io is the SERVER EMITS GOD DAMNIT
    //[socket] is the [client]/socket that has joined
    //[io.emit] is the server to emit it to everyone
    
    console.log("User connected", socket.id)

    socket.on("joinRoom", (roomName) => {
       
        // console.log(roomName, "Joined")
        socket.join(roomName)
        
        socket.on("sentMessage", (roomName,userName,message) => {
        //     roomChat[roomName].push({userName, message})
            io.to(roomName).emit("retrieveMessage", userName, message , roomChat[roomName])
     
    })


    })

   

})



    // //socket.on GET
    // socket.on("message", (roomName,userName,message) => {
    
    //     //io.emit POST
    //     io.emit("chat", ({userName,message}));

    //     //Sends message to all clients EXCEPT sender
    //     // socket.broadcast.emit("chat", data);
    // })