import { useContext, useState } from "react"
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotification } from '../../utils/unreadNotification'
import moment from 'moment'
export default function Notification() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext)
    const { notification, userChats, allUsers, markAllNotificationAsRead, markNotificationAsRead } = useContext(ChatContext)
    console.log("notification=-=-=-=-", notification);
    const unreadNotifications = unreadNotification(notification)
    console.log("unreadNotifications===================================",unreadNotifications);
    const modifiedNotifications = notification.map((n) => {
        const sender = allUsers.find((user) => user?.user[0]._id === n.senderId)
        console.log("sender:==",sender);
        return {
            ...n,
            senderName: sender?.username 
        }
    })
    return (
        <div className='notifications' onClick={() => setIsOpen(!isOpen)}>
            <div className="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
                {unreadNotifications.lenghr === 0 ? null : (
                    <span className="notification-count">
                        <span>{unreadNotifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ?
                (<div className="notifications-box">
                    <div className="notifications-header">
                        <h3>Notificatiobs</h3>
                        <div className="mark-as-read" onClick={() => markAllNotificationAsRead(notification)}>
                            Mark all as read
                        </div>
                    </div>
                    {modifiedNotifications?.length === 0 ? <span className="notification">no notification yet...</span> : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => {
                        return (
                            <div key={index} className={n.isRead ? 'notification' : 'notification not-read'} onClick={() => { markNotificationAsRead(n, userChats, user, notification) }}>
                                <span>{`${n.senderName} sent you a new mwssage`}</span>
                                <span className="notification-time">{moment(n.date).calender()}</span>
                            </div>
                        );
                    })}
                </div>) : null}
        </div>
    )
}
