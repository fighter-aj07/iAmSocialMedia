import "./Profile.css";
// import Topbar from "../../components/topbar/Topbar";
import Leftsidebar from "../../components/Home/Leftsidebar";
import Middlebar from "../../components/Home/Middlebar";
import ProfileRightBar from "../../components/Profile/ProfileRightBar";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import users from "../../Database/profile";
import { useRequest } from "../../hooks/request-hook";
import { useDispatch, useSelector } from "react-redux";
import { handledarkMode } from "../../store/actions/darkModeAction";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const { sendRequest } = useRequest();
  const { useridpr } = useParams();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  const [color, setColor] = useState("");
  const [divblock, setDivblock] = useState("flex");
  const [csstyle, setCsstyle] = useState("none");
  const [image1, setImage1] = useState(null);
  const [added, setAdded] = useState(false);
  const [follow, setFollow] = useState("Follow");
  // const [useriddd, setUseriddd] = useState(false);
  console.log(mode);
  const { isdarkMode } = mode;
  const id = useridpr;
  const [modes, setMode] = useState("dark");
  const fileRef = useRef(null);
  let formData = new FormData();
  // console.log("rendering", useridpr);
  const onImageChange = async (event) => {
    // console.log("meet", event);
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
    setDivblock("none");
    setCsstyle("flex");
  };
  const addpostHandller = async (e) => {
    e.preventDefault();
    // console.log("meet", formData);
    if (localStorage.hasOwnProperty("user")) {
      formData.append("userid", localStorage.getItem("user"));
      formData.append("file", fileRef.current.files[0]);
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/updateProfilePicture",
          "POST",
          formData
        );
        setAdded(true);
        setDivblock("flex");
        setCsstyle("none");
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const addFriend = async (e) => {
    e.preventDefault();
    alert("Friend Request Sent");
    if (localStorage.hasOwnProperty("user")) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/addFriend",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("user"),
            friendid: id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setFollow((prev) => (prev === "Follow" ? "Unfollow" : "Follow"));
      } catch (err) {
        console.log(err);
      }
    }
  };


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
       
        //if user.friends contains id then set follow to unfollow
        if (currentUser.friends.includes(localStorage.getItem("user"))) {
          setFollow("Unfollow");
        }
        setMyname(responseData.find((user) => user.userid === id).name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest, useridpr, added]);
  const [myname, setMyname] = useState(currentUser.name);
  const handleNameChange = (name) => {
    setMyname(name);
  };
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
    <>
      <Navbar />
      <div style={{ color: color }}>
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
              {localStorage.getItem("user") === id ? (
                <div className={`updatePict d-${divblock}`}>
                  <label className="btn btn-outline-info my-2">
                    <input
                      type="file"
                      // className="updatePict"
                      onChange={onImageChange}
                      name="file"
                      ref={fileRef}
                    />
                    Update Profile Photo
                  </label>
                </div>
              ) : (
                <div></div>
              )}
              <div className={`postimgggg my-2 d-${csstyle}`}>
                <img className="newimggg mx-3" src={image1} alt="Loading" />
                <button
                  className="addpost btn btn-outline-info"
                  onClick={addpostHandller}
                  disabled={image1 ? false : true}
                >
                  Change Image
                </button>
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{myname}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
              </div>
              {localStorage.getItem("user") !== id ? (
                <button className="profileFollowBtn" onClick={addFriend}>
                  {follow}
                </button>
              ) : (
                null
              )}
            </div>
            <div className="profileRightBottom">
              <Middlebar dispID={useridpr} />
              <ProfileRightBar
                handleNameChange={handleNameChange}
                id={id}
                profile
                useridpr={useridpr}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
