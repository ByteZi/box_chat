import Chat from "../Chat"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router'

const Room = (props) => {
    const {setMessage, message, userName} = props

    const [socket] = useState(() => io(':8000'));
    const [chat, setChat] = useState([]);
    const {roomName} = useParams()

    useEffect(()=>{
        socket.emit("joinRoom", roomName)
    },[roomName])
    
    useEffect(() => {
        socket.on("rMessage", (userName, message, roomChat) => {
            setChat([...roomChat, {userName, message}])
            
        })
    },[socket])

    const MessageHandler = (e) => {
        e.preventDefault()
        socket.emit("sentMessage", { roomName, userName, message })
        setMessage('')
    }

    return (
        <>
            <form onSubmit={MessageHandler}>
                <input onChange={(e) => setMessage(e.target.value)} value={message} />
                <button>Send</button>
            </form>
            <Chat chat={chat} />
        </>
    )
}
export default Room