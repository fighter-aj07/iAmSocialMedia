import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
import { useRequest } from "../../hooks/request-hook";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {sendRequest} = useRequest();

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userid);

    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5002/profile/getprof",
            "POST",
            JSON.stringify({
              userid: friendId,
              projection: {
                name: 1,
                profilePicture: 1,
              }
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(responseData[0]);
          setUser(responseData[0]);
        } catch (err) {
          console.log(err);
        }
      };
      fetchItems();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
        {/* {user ?
        ( */}
        <>
        <img
            className="conversationImg"
            src={
                user?.profilePicture
            ? user.profilePicture
            : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            }
            alt=""
        />
        <span className="conversationName">{user?.name}</span>
        </>
        {/* ): (null)
        } */}
    </div>
    )
}