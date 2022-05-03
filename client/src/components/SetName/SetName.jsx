import React, { useState } from 'react';
import "./SetName.css"

const SetName = (props) => {
    const [check, setCheck] = useState(true)
    const [nameErr, setNameErr] = useState(false)
    //Create current users using socket

    const NameSet = () => {
        if (props.userName === "") setNameErr(true)
        else setCheck(false)
    };


    while (check) {
        return (
            <div class="modal">
                
                <div class="setName">
                    <h1>Set Username</h1>
                    {
                        nameErr && <p style={{ color: "red" }}>Name cannot be null</p>
                    }
                    <input onChange={(e) => props.setUserName(e.target.value)} value={props.userName} /><br/>
                    <button class="set" onClick={NameSet}>Set</button>
                </div>

            </div>
        )
    }
    return (
        <></>
    )


}
export default SetName