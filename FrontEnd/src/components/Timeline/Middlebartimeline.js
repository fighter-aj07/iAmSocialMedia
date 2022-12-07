import React, { useState, useEffect } from "react";
import "./Middlebartimeline.css";
import "../Home/Middlebar.css";
import Postdetails from "../Home/Postdetails";
// import posts from "../../Database/posts";
// import users from "../../Database/profile";
import { useRequest } from "../../hooks/request-hook";

const Middlebartimeline = () => {
  const [post, setPost] = useState([]);
  const [csstyle, setCsstyle] = useState("none");
  const { sendRequest } = useRequest();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [cha, setCha] = useState(true);
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setCsstyle("block");
    }
  };

  const addpostHandller = async (e) => {
    e.preventDefault();
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
        imageUrl: image,
        likes: 0,
        comments: 0,
        comment: [],
        likeArr: [],
      };
      console.log("40 ", data);
      setPost((prevState) => {
        return [...prevState, data];
      });
      setText("");
      const response = await sendRequest(
        "http://localhost:5002/posts/addpost",
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        }
      );
      console.log("data ", data);
    }
  };
  console.log("post ", post);
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
  }, [sendRequest, cha]);

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="middle">
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
                        />
                        Add Photo or Video
                      </label>
                    </div>
                    <div className="postimggg">
                      <img
                        src={image}
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
                    disabled={image ? false : true}
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
          {post &&
            post
              .slice(0)
              .reverse()
              .map((element) => {
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
              })}
        </div>
      </div>
    </>
  );
};

export default Middlebartimeline;
