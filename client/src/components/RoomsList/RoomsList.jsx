import React, { useState } from 'react';
import io from 'socket.io-client';
import {Link} from "react-router-dom";

const RoomsList = (props) => {
    const {setRooms, rooms} = props

    const [socket] = useState(() => io(':8000'));
    const [newRoom, setNewRoom] = useState("")

    //Adds Room to server Object and current room State
    const CreateRoom = (e) => {
        e.preventDefault()
            if (newRoom ===  "") return null
            socket.emit("newRoom", newRoom)

             //FUTURE UPDATE / FIX : Once ["newRoom"] is called, ["updatedList"] gets called 
            socket.on('updatedList', updatedRoomList =>{
                setRooms(updatedRoomList)
            })
        setNewRoom("")
    }

    return (
        <>
            <div id="link-list">
                {
                    rooms.map((roomName, i) => <Link className="roomLink" to={`/${roomName}`} key={i}>{roomName}</Link>)
                }
            </div>
            <input id="newRoomInput" value={newRoom} onChange={(e) => setNewRoom(e.target.value)} />
            <button onClick={(e) => CreateRoom(e)} id="createbtn">Add Room</button>
        </>
    )
}
export default RoomsList 