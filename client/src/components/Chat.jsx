// import { useParams } from 'react-router'
const Chat = (props) => {
    const { chat } = props
   

    return (
        <div style={{ backgroundColor: "pink" }}>
            {
                chat.map((user, i) => {
                    return <div key={i}>{user.userName}: {user.message}</div>
                })
            }
        </div>
    )
}
export default Chat