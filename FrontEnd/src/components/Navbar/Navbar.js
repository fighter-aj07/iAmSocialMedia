import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { handledarkMode } from "../../store/actions/darkModeAction";
import { useState } from "react";
import { useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
export default function Navbar(props) {
  const { image1 } = props;
  const { sendRequest } = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  const [color, setColor] = useState("");
  // console.log(mode);
  const { isdarkMode } = mode;
  const [modes, setMode] = useState("dark");
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  let usernames = [];

  // const optionnn = [
  //   { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "blue", label: "Blue" },
  //   { value: "white", label: "White" },
  // ];
  const optionListtt = [];

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const [optionList, setOptionList] = useState([]);

  function handleSelect(data) {
    setSelectedOptions(data);
    // console.log("you selected", data);
    navigate(`/profile/${data.id}`);
  }

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
        // setOptionList(responseData);
        // console.log("mettttttttt", optionList);
        // console.log("meet jain", userdata);
        setFlag(true);
        for (let i = 0; i < userdata.length; i++) {
          usernames.push(userdata[i].name);
        }
        for (let i = 0; i < userdata.length; i++) {
          optionListtt.push({
            value: usernames[i].toLowerCase(),
            label: usernames[i],
            id: userdata[i].userid,
          });
        }
        setOptionList(optionListtt);
        for (let i = 0; i < optionListtt.length; i++) {
          // console.log("meet", optionList[i].label);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [flag]);

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };

  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/getprof",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setFlag(true);
        setName(responseData[0].name);
        setPicture(() => {
          if (responseData[0].profilePicture) {
            return responseData[0].profilePicture;
          } else {
            return "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [image1]);

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
    <div style={{ color: color }}>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">IAmSocial</span>
          </Link>
        </div>
        <div
          style={{ paddingRight: "50px" }}
          id="darkmode"
          className="darkmode"
        >
          <p style={{ marginRight: "3%" }}>
            <strong></strong>
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
            {/* <Search className="searchIcon" /> */}
            {/* <input
              placeholder="Search for friend, post or video"
              className="searchInput"
              value={text}
              onChange={searchHandler}
            /> */}
            {/* {console.log(optionList)} */}
            <Select
              options={optionList}
              placeholder="Search for Profiles"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
            />
            {/* <i className="fa-solid fa-magnifying-glass mx-3"></i> */}
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
            {/* <div className="topbarIconItem">
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconBadge">1</span>
          </div> */}
            <div className="topbarIconItem">
              {/* <Chat /> */}
              {/* <i class="fa-solid fa-message-lines"></i> */}
              {/* <span className="topbarIconBadge">2</span> */}
            </div>
            {/* <div className="topbarIconItem">
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconBadge">3</span>
          </div> */}
            <div className="topbarIconItem" onClick={logoutHandler}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
          <Link to={"/profile/" + localStorage.getItem("user")}>
            <img
              src={
                picture
                  ? picture
                  : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              }
              alt="Loading"
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
