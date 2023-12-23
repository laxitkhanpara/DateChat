import { useContext } from "react"
import { ChatContext } from "../../context/chatContext"
import { AuthContext } from "../../context/AuthContext"

const PotentialChart = () => {
    const { user } = useContext(AuthContext)
    const { potentialChart, createChat, onlineUser } = useContext(ChatContext)
    return (
        <>
            <div className="all-users" >
                {potentialChart && potentialChart.map((u, index) => {
                    return (
                        <div className="single-user" key={index} onClick={() => createChat(user?.user[0]._id, u._id)}>
                            {u.username}
                            <span className={onlineUser?.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PotentialChart;