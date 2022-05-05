import Chat from "../Chat"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router'
import "./Room.css"

const Room = (props) => {
    const {setMessage, message, userName} = props
    const { roomName } = useParams()

    const [socket] = useState(() => io(':8000'));
    const [chat, setChat] = useState([]);


    useEffect(()=>{
        socket.emit("joinRoom", roomName) //FIX 
        socket.emit("prev", roomName)
        socket.on( "sendPrev", roomChat => setChat([...roomChat]) )
    },[roomName,socket])
    
    useEffect(() => {
        socket.on("retrieveMessage", (userName, message, prevRoomChat) => {
           setChat(prevChat => [...prevChat, {userName,message}])
        })
    },[socket])

    const MessageHandler = (e) => {
        e.preventDefault()
        if (message === "") return null
      
        socket.emit("sentMessage", roomName,userName,message)
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