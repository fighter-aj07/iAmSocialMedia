import React, { useState, useEffect } from "react";
import "./Leftsidebar.css";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";

const Leftsidebar = () => {
  let userprof = localStorage.getItem("user");
  const { sendRequest } = useRequest();
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/userdata/getdetails",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setUserdata(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest]);
  // console.log(friends);
  // for (let i = 0; i < friends.length; i++) {
  //   const userImg = users.find((user) => user.userid === friends[i]);
  //   const username = login.find((user) => user.userid === friends[i]);
  //   userNames.push(username.username);
  //   userImages.push(userImg.profilePicture);
  // }
  // console.log(userNames);
  // console.log(userImages);
  // let k = 0;
  return (
    <div className="left">
      <ul className="leftside">
        <li className="leftitems">
          <i className="iconsss fa-solid fa-message"></i>
          <span className="leftitemsname">Chats</span>
        </li>
        <li className="leftitems">
          <i className="iconsss fa-regular fa-rss"></i>
          <span className="leftitemsname">Feed</span>
        </li>
        <li className="leftitems">
          <i className="iconsss fa-regular fa-video"></i>
          <span className="leftitemsname">Videos</span>
        </li>
        <li className="leftitems">
          <i className="iconsss fa-regular fa-user-group"></i>
          <span className="leftitemsname">Groups</span>
        </li>
        <li className="leftitems">
          <i className="iconsss fa-regular fa-calendar"></i>
          <span className="leftitemsname">Events</span>
        </li>
        <li className="leftitems quest">
          <i className="iconsss fa-regular fa-question"></i>
          <Link to="/questions" style={{ textDecoration: "none" }}>
            <span className="leftitemsname">Questions</span>
          </Link>
        </li>
      </ul>
      <ul className="leftsidebottom">
        <li className="leftitems friends">Friends</li>
        {userdata.map((element) => {
          return (
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img src={element.profilePicture} className="profimg" />
                <span className="leftitemsname2">{element.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leftsidebar;
