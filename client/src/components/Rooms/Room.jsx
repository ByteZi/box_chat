import Chat from "../cHAT/Chat"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router'
import "./Room.css"

const Room = (props) => {
    const { userName, rooms } = props
    const { roomName } = useParams()

    const [socket] = useState(() => io(':8000'));
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("")

    const [checkRoom, setCheckRoom] = useState(false)

    useEffect(() => {
        //Join Socket room after param changes
        socket.emit("joinRoom", roomName, userName)

        //Once room joined, set room chat to previous chat 
        socket.emit("getPrevMessagesInit", roomName)
        socket.on("prevMessagesInit", prevChat => setChat(prevChat))

    }, [roomName, socket])

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

    return (
        <>
            <h1>{roomName}</h1>

            <div style={{ backgroundColor: "pink" }}>
                {
                    chat.map((user, i) => {
                        return <p key={i}>{user.userName}: {user.message}</p>
                    })
                }
            </div>

            <form onSubmit={MessageHandler} className="flex-2">
                <input onChange={(e) => setMessage(e.target.value)} value={message} />
                <button>Send</button>
            </form>

        </>
    )
}
export default Room