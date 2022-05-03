
const Chat = (props) => {

    return (
        <>
            {
            props.chat.map((user, i) => {
                return <div key={i}>{user.userName}: {user.message}</div>
            })
            }
        </>
    )
}
export default Chat