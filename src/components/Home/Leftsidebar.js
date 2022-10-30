import React from "react";
import "./Leftsidebar.css";
import { Link } from "react-router-dom";

const Leftsidebar = () => {
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
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
        <li className="leftitemsbottom">
          <div className="imgsrc">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
              alt="Loading"
              className="profimg"
            />
            <span className="leftitemsname2">Meet Jain</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Leftsidebar;
