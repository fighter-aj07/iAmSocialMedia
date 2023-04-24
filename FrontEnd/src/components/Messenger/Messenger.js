import "./Messenger.css";
import Navbar from "../../components/Navbar/Navbar";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const {sendRequest} = useRequest();
//   const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const userid = localStorage.getItem("user");
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/profile/getprof",
            "POST",
            JSON.stringify({
              userid: localStorage.getItem("user"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setUser(responseData[0]);
          setOnlineUsers(responseData[0].friends);
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
    }, []);
//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

  useEffect(() => {
    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/conversation/" + userid,
            "GET",
          );
          setConversations(responseData);
            console.log("SETTING CONVERSATIONS", responseData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/message/" + currentChat._id,
            "GET",
          );
            setMessages(responseData);
            
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.userid,
      text: newMessage,
      conversationId: currentChat._id,
    };
    setNewMessage("");
    const receiverId = currentChat.members.find(
      (member) => member !== user.userid
    );

    // socket.current.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage,
    // });

    const fetchItems = async (id) => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/message",
            "POST",
            JSON.stringify(message),
            {
              "Content-Type": "application/json",
            }
          );
            setMessages([...messages, responseData]);
            
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatMenuConversationsWrapper">
            <span className="chatMenuConversations">Conversations</span>
            </div>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.userid} senderpfp = {user.profilePicture} otherid = {currentChat.members.find((member) => member !== user.userid)} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.userid}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}