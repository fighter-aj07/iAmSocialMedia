import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Navbar() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">IAmSocial</span>
        </Link>
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
        <Link to="/profile">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
