import "./Message.css";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import {format} from "timeago.js";
// import { format } from "timeago.js";

export default function Message({ message, own, senderpfp, otherid, currentChat }) {
    const [otherpfp, setOtherpfp] = useState("https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
    const {sendRequest} = useRequest();
    useEffect(() => {
        const fetchItems = async () => {
            try {
              const responseData = await sendRequest(
                "http://localhost:5002/profile/getprof",
                "POST",
                JSON.stringify({
                  userid: otherid,
                }),
                {
                  "Content-Type": "application/json",
                }
              );
              setOtherpfp(responseData[0].profilePicture);
            } catch (err) {
              console.log(err);
            }
          };
          fetchItems();
        }, [currentChat]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? senderpfp : otherpfp}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}