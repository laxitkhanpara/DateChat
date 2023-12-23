import { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import { Container, Stack } from "react-bootstrap"
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChart from '../components/chat/PotentialChart';
import ChatBox from '../components/chat/ChatBox';
import UsersShowBox from '../components/chat/UsersShowBox/UsersShowBox';


export default function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)
  console.log("userChats:", userChats);

  return (
    <Container>
      <div className="row">
        <div className="col-4">
          <UsersShowBox />
        </div>
      </div>
      <PotentialChart />
      {userChats?.length < 1 ? null : (
        <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
            {isUserChatsLoading && <p>Loadding chats...</p>}
            {userChats?.map((chat, index) => {
              console.log("chat-=-=-=-", chat)
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  )
}
