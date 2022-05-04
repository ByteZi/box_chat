import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from "./components/Chat"
import SetName from "./components/SetName/SetName"

function App() {

  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [socket] = useState(() => io(':8000'));
  const [chat, setChat] = useState([]);
  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState("")
  const [check, setCheck] = useState(false)

  useEffect(() => {
    if(window.sessionStorage.getItem('userName')){
      setUserName(window.sessionStorage.getItem('userName'))
      setCheck(true)
    }
  },[])
  
  useEffect(() => {
    socket.on("chat", ({ userName, message }) =>
      setChat(prevMessages => {
        return [{ userName, message }, ...prevMessages];
      })
    );
  }, []);

  const MessageHandler = (e) => {
    e.preventDefault()
    socket.emit("message", { userName, message })
    setMessage('')
  }

  return (
    <div className="App">
      {
        !check &&
        <SetName setUserName={setUserName} userName={userName} setCheck={setCheck} />
      }

      <header id="header">
        <h1>BoxRoom📦</h1>
      </header>

      <main id="body">
        <form onSubmit={MessageHandler}>
          <input onChange={(e) => setMessage(e.target.value)} value={message} />
          <button>Send</button>
        </form>

        <Chat chat={chat} />
      </main>
    </div>
  );
}

export default App;
