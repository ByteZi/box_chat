//server.js
const express = require('express')
const app = express();
const server = require('http').Server(app)
// const server = app.listen(8000, () => console.log("Server Port : 3000") )
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

server.listen(8000, () => console.log("Port 3000"))


app.set("views", './views')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

rooms = {}

app.get("/", (req,res) => {
    res.render('index', {rooms:rooms})
})

app.get("/:room", (res,req) => {
    res.render('room', {roomName : req.params.room})
})

// io.on('connection', socket => {
//     console.log("Nice to meet you.");

//     //socket.on GET
//     socket.on("message", ({userName, message}) => {
    
//         //io.emit POST
//         io.emit("chat", ({userName,message}));

//         //Sends message to all clients EXCEPT sender
//         // socket.broadcast.emit("chat", data);
//     })
// })