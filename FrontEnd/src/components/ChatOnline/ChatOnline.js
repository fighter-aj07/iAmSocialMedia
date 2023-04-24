import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";
import { useRequest } from "../../hooks/request-hook";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat, setOtherid }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {sendRequest} = useRequest();

  useEffect(() => {
    console.log("useeffecting");
    const fetchItems = async (id) => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/profile/getprof",
            "POST",
            JSON.stringify({
              userid: id,
              projection: {
                name: 1,
                profilePicture: 1,
                userid: 1,
              }
            }),
            {
              "Content-Type": "application/json",
            }
          );
            setFriends((prev) => [...prev, responseData[0]]);
            setOnlineFriends((prev) => [...prev, responseData[0]]);
        } catch (err) {
          console.log(err);
        }
      };
      onlineUsers.map((o) => fetchItems(o))
  }, [currentId]);

//   useEffect(() => {
//     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f.userid)));
//   }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/conversation/find/" + currentId + "/" + user.userid,
            "GET",
          );
          console.log(responseData);
            setCurrentChat(responseData);
            setOtherid(user.userid);
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o.profilePicture
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.name}</span>
        </div>
      ))}
    </div>
  );
}