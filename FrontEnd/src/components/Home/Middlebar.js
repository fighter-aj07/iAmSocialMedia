import React, { useState, useEffect } from "react";
import "./Middlebar.css";
import Postdetails from "./Postdetails";
// import posts from "../../Database/posts";
import users from "../../Database/profile";
import { useRequest } from "../../hooks/request-hook";

const Middlebar = () => {
  const [post, setPost] = useState([]);
  const { sendRequest } = useRequest();
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const userDet = users.find(
    (user) => user.userid === localStorage.getItem("user")
  );
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const addpostHandller = async (e) => {
    // console.log(image);
    e.preventDefault();
    if (localStorage.hasOwnProperty("userid")) {
      const response = await sendRequest(
        "http://localhost:5002/posts/addpost",
        "POST",
        JSON.stringify({
          userid: localStorage.getItem("userid"),
          sendName: userDet.name,
          time: 0,
          description: text,
          imageUrl: image,
          likes: 0,
          comments: 0,
          comment: [],
        }),
        {
          "Content-Type": "application/json",
        }
      );
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/posts/getposts",
          "POST",
          JSON.stringify({
            category: "fruit",
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setPost(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest]);

  return (
    <div className="middle container">
      <div className="middletop my-1">
        <div className="middletopbar">
          <div className="middleleftsidetop">
            <img
              src={userDet.profilePicture}
              alt="Loading"
              className="middleimageleft"
            />
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
              <i className="fa-solid fa-photo-film"></i>
              <span className="mx-2 fw-bold">
                <label className="custom-file-upload">
                  <input
                    type="file"
                    className="mx-2"
                    onChange={onImageChange}
                  />
                  Add Photo or Video
                </label>
              </span>
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
      {post.map((element) => {
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default Middlebar;
