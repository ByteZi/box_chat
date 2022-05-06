import React, { useState, useEffect } from 'react';
import './App.css';
import SetName from "./components/SetName/SetName"
import Room from "./components/Rooms/Room"
import RoomsList from "./components/RoomsList/RoomsList"
import Main from "./components/Main/Main"

import io from 'socket.io-client';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [socket] = useState(() => io(':8000'));
  
  const [userName, setUserName] = useState("")
  const [check, setCheck] = useState(false)
  const [rooms, setRooms] = useState([])

  //Check if user has a UserName
  useEffect(() => {
    if (window.sessionStorage.getItem('userName')) {
      setUserName(window.sessionStorage.getItem('userName'))
      setCheck(true)
    }
  }, [])

  //Initialize RoomList on Web Startup
  useEffect(() => {
    socket.on("InitRoom", roomKeys => {
      setRooms(roomKeys)
    })
  }, [socket])

  return (
    <div className="App">
      <BrowserRouter>
        {/* Modal just for initial entering of user */}
        {!check && <SetName setUserName={setUserName} userName={userName} setCheck={setCheck} />}

        <header id="header">
          <h1>BoxRoom📦</h1>
        </header>

        <main id="body">

          <div id="main-left">
            <RoomsList setRooms={setRooms} rooms={rooms} />
          </div>
          <div id="main-right">
          <Switch>
            <Route path="/:roomName">

              <Room
                userName={userName}
                rooms={rooms}
              />
              

            </Route>
            <Route path="/">
              <Main/>
            </Route>
          </Switch>
          </div>
        </main>

      </BrowserRouter>
    </div>
  );
}

export default App;


// const MessageHandler = (e) => {
//   e.preventDefault()
//   socket.emit("message", { userName, message })
//   setMessage('')
// }

/* <form onSubmit={MessageHandler}>
          <input onChange={(e) => setMessage(e.target.value)} value={message} />
          <button>Send</button>
        </form>
        <Chat chat={chat} /> */