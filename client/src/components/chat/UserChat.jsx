import { Stack } from 'react-bootstrap'
import useFetchRecipient from '../../hooks/useFetchRecipient'
import avtar from '../../assets/avtar.svg'
import { useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
import PropTypes from 'prop-types'; // Import PropTypes
import unreadNotification from '../../utils/unreadNotification'

export default function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient({ chat, user })
  const { onlineUser, notification } = useContext(ChatContext)

  const unreadNotifications = unreadNotification(notification)
  console.log("unreadNotifications-------------------", unreadNotifications);
  const thisuserNotifications = unreadNotifications?.filter(n => n.senderId == recipientUser?._id)
  console.log("onlineUser:===", onlineUser);
  const isOnline = onlineUser?.some((user) => user?.userId === recipientUser?.data._id)
  console.log("isOnline:===", isOnline);
  console.log("recipientUser:", recipientUser);
  console.log("thisuserNotifications?.length==========", thisuserNotifications?.length);
  return (
    <Stack direction='horizontal' gap={3} className='user-card align-content-between' role="button">
      <div className='d-flex'>
        <div className="me-2">
          <img src={avtar} height={35} />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.data.username}</div>
          <div className="text">text the message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">12/12/2003</div>
      <div className={thisuserNotifications?.length > 0 ? "this-user-notifications" : ""}>{thisuserNotifications?.length > 0 ? thisuserNotifications?.length : ""}</div>
      <span className={isOnline ? 'user-online' : ""}></span>
    </Stack>
  )
}
UserChat.propTypes = {
  chat: PropTypes.object.isRequired, // Update the prop type based on the expected type
  user: PropTypes.object.isRequired, // Update the prop type based on the expected type
};