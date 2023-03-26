import React, { useState, useEffect, useRef } from "react";
import "./Middlebar.css";
import Postdetails from "./Postdetails";
import { useRequest } from "../../hooks/request-hook";
// import axios from "axios";

const Middlebar = (props) => {
  const [post, setPost] = useState([]);
  const [csstyle, setCsstyle] = useState("none");
  const { sendRequest } = useRequest();
  const [image1, setImage1] = useState(null);
  const [added, setAdded] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [cha, setCha] = useState(true);
  const fileRef = useRef(null);
  let formData = new FormData();
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const onImageChange = async (event) => {
    console.log("meet", event);
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
      setCsstyle("block");
    }
    // const file = event.target.files[0];
    // const base64img = await setFileToBase(file);
    // console.log(base64img);
    // setImage(base64img);
  };
  // const setFileToBase = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  const addpostHandller = async (e) => {
    e.preventDefault();
    console.log("meet", formData);
    let date = new Date();
    let time =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "/" +
      date.getHours() +
      "/" +
      date.getMinutes() +
      "/" +
      date.getSeconds();

    setCha((prev) => !prev);
    if (localStorage.hasOwnProperty("user")) {
      const data = {
        userid: localStorage.getItem("user"),
        sendName: name,
        time: time,
        description: text,
        likes: 0,
        comments: 0,
        comment: [],
        likeArr: [],
      };
      formData.append("userid", localStorage.getItem("user"));
      formData.append("file", fileRef.current.files[0]);
      formData.append("sendName", name);
      formData.append("time", time);
      formData.append("description", text);
      formData.append("likes", 0);
      formData.append("comments", 0);
      formData.append("comment", []);
      formData.append("likeArr", []);
      // console.log("40 ", data);
      console.log(formData.get("file"), "chut");
      setPost((prevState) => {
        return [...prevState, data];
      });
      setText("");
      setCsstyle("none");
      setImage1(null);
      // const response = await sendRequest(
      //   "http://localhost:5002/posts/addpost",
      //   "POST",
      //   formData
      // );
      // axios
      //   .post("http://localhost:5002/posts/addpost", formData)
      //   .then((res) => {
      //     console.log(res);
      //   });
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/posts/addpost",
          "POST",
          formData
        );
        setTimeout(() => {
          setAdded(true);
        }, 250);
        // setTimeout(function () {
        //   window.location = window.location;
        // }, 3500);
      } catch (err) {
        console.log(err);
      }

      // console.log("data ", data);
    }
  };
  // console.log("post ", post);
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
        setName(responseData[0].name);
        setPicture(responseData[0].profilePicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest]);

  useEffect(() => {
    const fetchItems2 = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/posts/getposts",
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setPost(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems2();
  }, [sendRequest, cha, added]);
  return (
    <div className="middle container">
      <div className="middletop my-1">
        <div className="middletopbar">
          <div className="middleleftsidetop">
            <img src={picture} alt="Loading" className="middleimageleft" />
          </div>
          <div className="middlerightsidetop">
            <textarea
              type="text"
              placeholder="Want to share anything ?"
              className="postdesc2"
              rows="4"
              onChange={handleOnChange}
              value={text}
            ></textarea>
          </div>
        </div>
        <div className="middletopbottom">
          <ul className="middletopbottomul">
            <li className="middletopbottomli">
              <div className="containnnnn">
                <div className="llll">
                  <i className="fa-solid fa-photo-film"></i>
                </div>
                <div className="labelll">
                  <label className="custom-file-upload mx-2 fw-bold">
                    <input
                      type="file"
                      className="mx-2"
                      onChange={onImageChange}
                      ref={fileRef}
                      name="file"
                    />
                    Add Photo or Video
                  </label>
                </div>
                <div className="postimggg">
                  <img
                    src={image1}
                    alt="Loading"
                    className={`imageinput d-${csstyle}`}
                  />
                </div>
              </div>
            </li>
            <li className="middletopbottomli">
              {/* <i className="fa-solid fa-tag"></i>
              <span className="mx-2 fw-bold">Tag</span> */}
              <button
                className="addpost btn btn-outline-info"
                onClick={addpostHandller}
                disabled={image1 ? false : true}
              >
                Add Post
              </button>
            </li>
            {/* <li className="middletopbottomli">
              <i className="fa-solid fa-location-dot"></i>
              <span className="mx-2 fw-bold">Location</span>
            </li> */}
          </ul>
        </div>
      </div>
      {post
        .slice(0)
        .reverse()
        .map((element) => {
          if (props.dispID === element.userid || props.dispID === "all") {
            return (
              <div className="middlebottom" key={element.imageUrl}>
                <Postdetails
                  sendName={element.sendName}
                  time={element.time}
                  description={element.description}
                  imageUrl={element.imageUrl}
                  likes={element.likes}
                  comments={element.comments}
                  comment={element.comment}
                  postid={element.userid}
                  likeArr={element.likeArr}
                  setCha={setCha}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default Middlebar;
