import React, { useState } from 'react';
import "./SetName.css"

const SetName = (props) => {
    
    const [nameErr, setNameErr] = useState("init")
    
    const NameSet = () => {
        if (props.userName === "") setNameErr("empty")
        if (props.userName.length > 20) setNameErr("long")
        else {
            window.sessionStorage.setItem('userName', props.userName)
            props.setCheck(window.sessionStorage.getItem('userName', props.userName))
        }
    };
    
    return (
        <div className="modal">

            <div className="setName">
                <h1>Username 📦</h1>
 
                <input className="setinput" onChange={(e) => props.setUserName(e.target.value)} value={props.userName} /><br />
                <button className="setbtn" onClick={NameSet}>Set</button>
                {
                    nameErr === "empty" && <p style={{ color: "red" }}>Name cannot be null</p> 
                }
                {
                    nameErr === "long" && <p style={{ color: "red" }}>Name too long</p> 
                }
            </div>

        </div>
    )
}

export default SetName