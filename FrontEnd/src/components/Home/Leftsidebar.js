import React, { useState, useEffect } from "react";
import "./Leftsidebar.css";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import { useDispatch, useSelector } from "react-redux";

const Leftsidebar = () => {
  let userprof = localStorage.getItem("user");
  const { sendRequest } = useRequest();
  const [userdata, setUserdata] = useState([]);

  const mode = useSelector((state) => state.darkMode);
  console.log(mode);
  const { isdarkMode } = mode;

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
  const [modes, setMode] = useState("dark");
  const [color, setColor] = useState("");
  useEffect(() => {
    document.body.style.background = isdarkMode
      ? "radial-gradient(circle, rgba(32,32,32,1) 0%, rgba(9,9,9,1) 100%)"
      : "#f5f5f5";
    if (isdarkMode) {
      setMode("light");
      setColor("white");
    } else {
      setMode("dark");
      setColor("black");
    }
  }, [isdarkMode]);

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
      <div style={{ color: color }}>
        {console.log(color)}
        <ul className="leftside">
          {/* <li className="leftitems">
          <i className="iconsss fa-solid fa-message"></i>
          <span style={{color:color}}
           className="leftitemsname">Chats</span>
        </li> */}
          <li className="leftitems">
            <i className="iconsss fa-regular fa-rss"></i>
            <Link to="/timeline" style={{ textDecoration: "none" }}>
              <span style={{ color: color }} className="leftitemsname">
                Feed
              </span>
            </Link>
          </li>
          {/* <li className="leftitems">
          <i className="iconsss fa-regular fa-video"></i>
          <span style={{color:color}} className="leftitemsname">Videos</span>
        </li> */}
          {/* <li className="leftitems">
          <i className="iconsss fa-regular fa-user-group"></i>
          <span style={{color:color}} className="leftitemsname">Groups</span>
        </li> */}
          <li className="leftitems">
            <i className="iconsss fa-regular fa-calendar"></i>
            <span style={{ color: color }} className="leftitemsname">
              Events
            </span>
          </li>
          <li className="leftitems quest">
            <i className="iconsss fa-regular fa-question"></i>
            <Link to="/questions" style={{ textDecoration: "none" }}>
              <span style={{ color: color }} className="leftitemsname">
                Questions
              </span>
            </Link>
          </li>
        </ul>
        <ul className="leftsidebottom">
          <li style={{ color: color }} className="leftitems friends">
            Friends
          </li>
          {userdata.map((element) => {
            return (
              <li className="leftitemsbottom">
                <Link
                  to={"/profile/" + element.userid}
                  style={{ textDecoration: "none" }}
                >
                  <div className="imgsrc">
                    <img src={element.profilePicture} className="profimg" />
                    <span style={{ color: color }} className="leftitemsname2">
                      {element.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Leftsidebar;
