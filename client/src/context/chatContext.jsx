import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import PropTypes from "prop-types";
import { Prev } from "react-bootstrap/esm/PageItem";
import { io } from "socket.io-client";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChart, setpotentialChart] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(null)
    const [messagesError, setMessagesError] = useState(null)
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const [notification, setNotification] = useState([])
    const [allUsers, setAllUsers] = useState([])
    console.log("useruseruseruseruseruser:", user);
    console.log("userChats=userChats=userChats:",userChats);


    //initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    }, [user])
    

    //add online users
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", user?.user[0]._id)
        socket.on("getOnlineUser", (res) => {
            setOnlineUser(res)
        });

        return () => {
            socket.off("getOnlineUser");
        };
    }, [socket, user?.user])


    //send message
    useEffect(() => {
        if (socket === null) return;
        console.log("currentChat:-=-=-=-=", currentChat);
        const recipientId = currentChat?.members.find((id) => id !== user?.user[0]?._id);
        console.log("send message-recipientId:", recipientId);
        socket.emit("sendMessage", { ...newMessage, recipientId })
        return () => {
            socket.off("getOnlineUser");
        };
    }, [currentChat, newMessage, socket]);
    

    //recive mwssage and notification
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", res => {
            console.log("recive mwssage---res:", res);
            if (currentChat?._id !== res.chatId) return;
            setMessages((prevMessages) => [...prevMessages, res]);
        })
        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => id === res.senderId)
            if (isChatOpen) {
                setNotification(prev => [{ ...res, isRead: true }, ...prev])
            } else {
                setNotification(prev => [res, ...prev])
            }
        })
        return () => {
            socket.off("getMessage")
        }

    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {

            try {
                const response = await getRequest(`${baseUrl}/getUser`)
                if (response.error) {
                    return console.log(response);
                }
                const pChats = response.data.filter((u) => {
                    let isChatCreated = false;
                    if (user?.user[0]._id === u._id) return false;
                    if (userChats) {
                        isChatCreated = userChats?.some((chat) => {
                            return chat.members[0] === u._id || chat.members[1] === u._id
                        })
                    }
                    return !isChatCreated;

                });
                setpotentialChart(pChats);
                setAllUsers(response)
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [userChats, user])

    useEffect(() => {

        const getUserChats = async () => {

            try {
                if (user?.user[0]._id) {
                    setIsUserChatsLoading(true)
                    const response = await getRequest(`${baseUrl}/chats/${user?.user[0]?._id}`)
                    setIsUserChatsLoading(false)
                    if (response.status !== 200) {
                        return setUserChatsError(response)
                    }
                    setUserChats(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }
        getUserChats()
    }, [user])

    useEffect(() => {

        const getMessages = async () => {

            try {

                setIsMessagesLoading(true)
                setMessagesError(null)
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
                setIsMessagesLoading(false)
                if (response.status !== 200) {
                    return setMessagesError(response)
                }
                setMessages(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        getMessages()
    }, [currentChat])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        console.log("sender:", sender);
        if (!textMessage) return console.log("you must write somthing...");
        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender.user[0]._id,
            text: textMessage
        }))
        console.log("response--", response);
        if (response.error) return setSendTextMessageError(response)
        setNewMessage(response)
        setMessages((Prev) => [...Prev, response])
        setTextMessage("")
    }, [])

    const updateCurrentChat = useCallback(async (chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback((firstId, secondId) => {
        const response = postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secondId }))
        if (response.error) return console.log("error creating chat", response);
        setUserChats((Prev) => [...Prev, response]);
    }, [])

    //mark all notification as read
    const markAllNotificationAsRead = useCallback((notification) => {
        const mNotifications = notification.map(n => {
            return { ...n, isRead: true };
        })
        setNotification(mNotifications)
    }, [])
    
    const markNotificationAsRead=useCallback((n,userChats,user,notification)=>{
        //find chat to open
        const desiredChat=userChats.find(chat=>{
            const chatMembers=[user?.user[0]._id,n.senderId]  // we need to make changes in this and should tput user._id
            const isDesiredChat=chat?.members.every((member)=>{
                return chatMembers.includes(member);
            });
            return isDesiredChat
        })
        //mark notification as read
        const mNotification=notification.map((el)=>{
            if(n.senderId===el.senderId){
                return {...n,isRead:true}
            }else{
                return el
            }
        })
        updateCurrentChat(desiredChat)
        setNotification(mNotification)
    },[updateCurrentChat])

    return <ChatContext.Provider value={{
        userChats, isUserChatsLoading, userChatsError, potentialChart, createChat, currentChat, updateCurrentChat, messages, isMessagesLoading, messagesError, sendTextMessage, onlineUser, notification, allUsers,markAllNotificationAsRead,markNotificationAsRead
    }}>{children}</ChatContext.Provider>

}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.shape({
        user: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                // Include other properties if needed
            })
        ).isRequired,
    }),
};

