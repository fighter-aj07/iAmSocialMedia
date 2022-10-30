import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Navbar() {
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
          <span className="topbarLink">Timeline</span>
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
        </div>
        <Link to="/profile/:username">
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
