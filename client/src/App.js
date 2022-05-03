import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {

  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [socket] = useState(() => io(':8000'));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("new_message_from_server", msg => 
      setMessages(prevMessages => {
        return [msg, ...prevMessages];
      })
    )
  },[])
 
  // useEffect(() => {

  //   // we need to set up all of our event listeners
  //   // in the useEffect callback function
  //   console.log('Is this running?');
    
  //   // note that we're returning a callback function
  //   // this ensures that the underlying socket will be closed if App is unmounted
  //   // this would be more critical if we were creating the socket in a subcomponent
  //   return () => socket.disconnect(true);
  // }, []);

  return (
    <div className="App">
      <h1>Socket Test</h1>
    </div>
  );
}

export default App;
