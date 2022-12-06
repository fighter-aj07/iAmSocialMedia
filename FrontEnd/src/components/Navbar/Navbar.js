import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import users from "../../Database/profile";
import { useDispatch, useSelector } from "react-redux";
import { handledarkMode } from "../../store/actions/darkModeAction";
import { useState } from "react";
import { useEffect } from "react";



export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  const [color,setColor] = useState("");
  console.log(mode);
  const { isdarkMode } = mode;
  const [modes, setMode] = useState("dark");
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  const userDet = users.find(
    (user) => user.userid === localStorage.getItem("user")
  );
  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
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
  return (
    <div style={{color:color}}>
      
    <div className="topbarContainer">
      
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">IAmSocial</span>
        </Link>
      </div>
      <div style={{paddingRight :'50px' }} id="darkmode" className="darkmode">
          <p style={{ marginRight: "3%" }}>
            <strong ></strong>
          </p>
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={switchDarkMode}
            checked={isdarkMode}
          />
          <label htmlFor="checkbox" className="label">
            <div className="ball"></div>
          </label>
        </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass mx-3"></i>
          {/* <Search className="searchIcon" /> */}
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to="/timeline" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            {/* <Person /> */}
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            {/* <Chat /> */}
            {/* <i class="fa-solid fa-message-lines"></i> */}
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            {/* <Notifications /> */}
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem" onClick={logoutHandler}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
        <Link to={"/profile/" + localStorage.getItem("user")}>
          <img
            src={userDet.profilePicture ? userDet.profilePicture : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}
            alt="Loading"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
    </div>
  );
}
