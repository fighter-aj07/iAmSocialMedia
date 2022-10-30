import React, { useState } from "react";
import "./Middlebar.css";
import Postdetails from "./Postdetails";
import posts from "../../Database/posts";

const Middlebar = () => {
  const [post, setPost] = useState(posts);

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
          sendName: "Meet Jain",
          time: 0,
          description: text,
          imageUrl: image,
          likes: 0,
          comments: 0,
          comment: [],
        },
        ...prevstate,
      ];
      setText("");
      setImage(null);
      return newState;
    });
  };

  return (
    <div className="middle container">
      <div className="middletop my-1">
        <div className="middletopbar">
          <div className="middleleftsidetop">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
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
