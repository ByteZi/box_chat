import React, { useState, useEffect } from 'react';

import './App.css';

import SetName from "./components/SetName/SetName"
import Room from "./components/Rooms/Room"
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";


function App() {
  
  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState("")
  const [check, setCheck] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem('userName')) {
      setUserName(window.sessionStorage.getItem('userName'))
      setCheck(true)
    }
  }, [])

  return (
    <div className="App">

      {/* Modal just for initial entering of user */}
      {!check && <SetName setUserName={setUserName} userName={userName} setCheck={setCheck} />}

      <BrowserRouter>
        <header id="header">
          <h1>BoxRoom📦</h1>
          <Link to="/Games">Room1</Link>
          {"  | "}
          <Link to="/Coding">Room2</Link>
        </header>

        <main id="body">
          <Switch>
            <Route path="/:roomName">
              <Room
                setMessage={setMessage}
                message={message}
                userName={userName}
              />
            </Route>
          </Switch>
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