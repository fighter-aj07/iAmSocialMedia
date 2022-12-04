import React, { useState } from "react";
import "./Middlebartimeline.css";
import Postdetails from "../Home/Postdetails";
import posts from "../../Database/posts";
import users from "../../Database/profile";
import Navbar from "../Navbar/Navbar";

const Middlebartimeline = () => {
  const userDet = users.find(
    (user) => user.userid === localStorage.getItem("user")
  );
  const myPost = posts.filter((user) => user.sendName === userDet.name);
  const [post, setPost] = useState(myPost);
  console.log(post);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const addpostHandller = (e) => {
    // console.log(image);
    e.preventDefault();
    setPost((prevstate) => {
      let newState = [
        {
          sendName: userDet.name,
          time: 0,
          description: text,
          imageUrl: image,
          likes: 0,
          comments: 0,
          comment: [],
        },
        ...prevstate,
      ];
      setImage(null);
      return newState;
    });
  };
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="middle">
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
          {post &&
            post.map((element) => {
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
      </div>
    </>
  );
};

export default Middlebartimeline;