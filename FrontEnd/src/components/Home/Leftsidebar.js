import React from "react";
import "./Leftsidebar.css";
import { Link } from "react-router-dom";
import users from "../../Database/profile";
import login from "../../Database/login";

const Leftsidebar = () => {
  let userprof = localStorage.getItem("user");

  const userDet = users.find((user) => user.userid === userprof);
  const friends = userDet.friends;
  // console.log(friends);
  let userImages = [];
  let userNames = [];
  for (let i = 0; i < friends.length; i++) {
    const userImg = users.find((user) => user.userid === friends[i]);
    const username = login.find((user) => user.userid === friends[i]);
    userNames.push(username.username);
    userImages.push(userImg.profilePicture);
  }
  let k = 0;
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
        {userImages.map((element) => {
          return (
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img src={element} className="profimg" />
                <span className="leftitemsname2">{userNames[k++]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leftsidebar;
