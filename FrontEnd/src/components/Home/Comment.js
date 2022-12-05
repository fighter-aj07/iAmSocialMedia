import React, { useState, useEffect } from "react";
import "./Comment.css";
// import users from "../../Database/profile";
import { useRequest } from "../../hooks/request-hook";

const Comment = (props) => {
  const { comdescrip, userId } = props;
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  // const userDet = users.find((user) => user.userid === userId);
  const { sendRequest } = useRequest();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/getprof",
          "POST",
          JSON.stringify({
            userid: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);

        setName(responseData[0].name);
        setPicture(responseData[0].profilePicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);
  return (
    <>
      <div className="commentimg">
        <img src={picture} alt="Loading" className="profimgcomment" />
        <span className="commentitemsname">{name}</span>
        <span className="commentitemsname2 text-muted">2 mins ago</span>
      </div>
      <div className="commenttext">
        <div className="ptag">
          <p className="commenttextptag">{comdescrip}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
