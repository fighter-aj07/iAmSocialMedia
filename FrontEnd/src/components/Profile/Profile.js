import "./Profile.css";
// import Topbar from "../../components/topbar/Topbar";
import Leftsidebar from "../../components/Home/Leftsidebar";
import Middlebar from "../../components/Home/Middlebar";
import ProfileRightBar from "../../components/Profile/ProfileRightBar";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import users from "../../Database/profile";
import { useRequest } from "../../hooks/request-hook";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const { sendRequest } = useRequest();
  const {useridpr} = useParams();
  const id = useridpr;
  console.log("rendering", useridpr);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/getprofiles",
          "POST",
          JSON.stringify({}),
          {
            "Content-Type": "application/json",
          }
        );
        setUsers(responseData);
        setCurrentUser(responseData.find((user) => user.userid === id));
        setMyname(responseData.find((user) => user.userid === id).name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest, useridpr]);
  const [myname, setMyname] = useState(currentUser.name);
  const handleNameChange = (name) => {
    setMyname(name);
  };
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftsidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  "https://tse4.mm.bing.net/th?id=OIP.bQQVbujEsBtUk0iWDUEHJAHaEg&pid=Api&P=0"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  currentUser.profilePicture
                    ? currentUser.profilePicture
                    : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
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
            <ProfileRightBar
              handleNameChange={handleNameChange}
              id={id}
              profile
              useridpr = {useridpr}
            />
          </div>
        </div>
      </div>
    </>
  );
}
