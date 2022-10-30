import "./Profile.css";
// import Topbar from "../../components/topbar/Topbar";
import Leftsidebar from "../../components/Home/Leftsidebar";
import Middlebar from "../../components/Home/Middlebar";
import ProfileRightBar from "../../components/Profile/ProfileRightBar";
import { useEffect, useState } from "react";

export default function Profile() {
  const [myname, setMyname] = useState("Meet Jain");
  const handleNameChange = (name) => {
    setMyname(name);
  };
  return (
    <>
      <div className="profile">
        <Leftsidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="https://tse4.mm.bing.net/th?id=OIP.bQQVbujEsBtUk0iWDUEHJAHaEg&pid=Api&P=0"
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://tse4.mm.bing.net/th?id=OIP.bQQVbujEsBtUk0iWDUEHJAHaEg&pid=Api&P=0"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{myname}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Middlebar />
            <ProfileRightBar handleNameChange={handleNameChange} profile/>
          </div>
        </div>
      </div>
    </>
  );
}