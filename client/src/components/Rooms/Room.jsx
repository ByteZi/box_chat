
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router'
import "./Room.css"
import ConnectedUsers from "../ConnectedUsers/ConnectedUsers"

const Room = (props) => {
    const { userName, rooms } = props
    const { roomName } = useParams()

    const [socket] = useState(() => io(':8000'));
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("")

    const MessageHandler = (e) => {
        e.preventDefault()
        if (message === "") return null
        else {
            //emit send message
            socket.emit("sentMessage", roomName, userName, message)
            //once event runs, run ['prevMessages'] listener
            socket.on("prevMessages", roomChat => setChat(roomChat))
            setMessage('')
        }
    }

    useEffect(() => {

        if (rooms.includes(roomName)) {
            //Join Socket room after param changes
            socket.emit("joinRoom", roomName, userName)
            //Once room joined, set room chat to previous chat 
            socket.emit("getPrevMessagesInit", roomName)
            socket.on("prevMessagesInit", prevChat => setChat(prevChat))
        }
    }, [roomName, socket, userName, rooms])

    if (rooms.includes(roomName)) {
        return (
            <div id="chat">
                <div id="chatroom-name">
                    <h1 className="flex-05">{roomName} 📦</h1>
                </div>

                <div id="chat-container" className="flex-3">
                    {
                        chat.map((user, i) => {
                            return user.userName === userName ?
                                <div key={i} className="user-container">
                                    <p key={i} className="userChat">
                                        <span className="userName">{user.userName} </span> : {user.message}
                                    </p>
                                </div>
                                :
                                <div key={i} className="public-container">
                                    <p className="publicChat">
                                        <span className="userName">{user.userName} </span> : {user.message}
                                    </p>
                                </div>
                        })
                    }
                </div>

                <form onSubmit={MessageHandler} className="flex-05 sendform">
                    <input placeholder="Send message" className="sendinput" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button className="sendbtn">Send</button>
                </form>
            </div>
        )
    }
    else {
        return (
            <div id="Error404">
                <h1>POTATOE ROOM 🥔</h1>
            </div>
        )
    }
}
export default Room