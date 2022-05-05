
const Chat = (props) => {

    return (
        <div style={{backgroundColor:"pink"}}>
            {
            props.chat.map((user, i) => {
                return <div key={i}>{user.userName}: {user.message}</div>
            })
            }
        </div>
    )
}
export default Chat