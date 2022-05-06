//server.js
const express = require('express');
const app = express();
const server = require('http').Server(app)
const PORT = 8000
// const server = app.listen(8000, () => console.log("Server Port : 3000") )
const io = require('socket.io')(server, { cors: true });

server.listen(PORT, () => console.log("Port :",PORT))

let roomChat = {
    Games : []
}

io.on('connection', (socket) => {
    //io is the SERVER EMITS GOD DAMNIT
    //[socket] is the [client]/socket that has joined
    //[io.emit] is the server to emit it to everyone

    console.log("User connected", socket.id)

    //Emit all rooms to everyone
    io.emit("InitRoom", Object.keys(roomChat))
    
    socket.on("joinRoom", (roomName, userName)=> {
        console.log("User Joined : ",userName, roomName)
        socket.join(roomName)
        io.emit("prevChat", roomChat[roomName])
    })

     //FUTURE UPDATE / FIX : Once ["newRoom"] is called, ["updatedList"] gets called 
    socket.on("newRoom", (newRoom) =>{
        if(roomChat[newRoom]) console.log("room Exists")
        // roomChat[newRoom] = []
        else{
            roomChat[newRoom] = []
            io.emit("updatedList", Object.keys(roomChat))
        }
 
    })

    //Message 

    socket.on("sentMessage", (roomName,userName,message) => {
        roomChat[roomName].push({userName, message})
        io.to(roomName).emit("prevMessages", roomChat[roomName])
    })

    socket.on("getPrevMessagesInit", roomName =>{
        socket.emit("prevMessagesInit", roomChat[roomName])
    })
})

//Use io.to().emit instead