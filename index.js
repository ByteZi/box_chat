const Port = 8000;
const webSocketServer = require('websocket').server;
const http = require('http')

const server = http.createServer();
server.listen(Port);
console.log("Port: "+Port);

const wbServer = new webSocketServer({
    httpServer: server
});

const clients = {};

// Generate a unique User ID for users
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wbServer.on('request', function (request){
    var userID = getUniqueID();
    console.log((new Date()) + 'Recieved a new connection from : '+ request.origin +'.');

    //Reqrite to only allow request from allowed origin
    const connection = request.accept(null, request.orign)
    clients[userID] = connection;

    connection.on("message", function(message){
        if(message.type === "utf8"){
            console.log("recived message: ", message.utf8Data);

            //Broadcast
            for(key in clients){
                clients[key].sendUTF(message.utf8Data);
                console.log('send Message to:', clients[key])
            }
        }
    })
})