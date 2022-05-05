import React, { useState } from 'react';
import "./SetName.css"

const SetName = (props) => {
    
    const [nameErr, setNameErr] = useState(false)
    
    const NameSet = () => {
        if (props.userName === "") setNameErr(true)
        else {
            window.sessionStorage.setItem('userName', props.userName)
            props.setCheck(window.sessionStorage.getItem('userName', props.userName))
        }
    };
    
    return (
        <div className="modal">

            <div className="setName">
                <h1>Set Username</h1>
                {
                    nameErr && <p style={{ color: "red" }}>Name cannot be null</p>
                }
                <input onChange={(e) => props.setUserName(e.target.value)} value={props.userName} /><br />
                <button className="set" onClick={NameSet}>Set</button>
            </div>

        </div>
    )
}

export default SetName