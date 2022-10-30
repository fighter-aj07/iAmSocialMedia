import React, { useState } from "react";
import "./Middlebar.css";
import Postdetails from "./Postdetails";

const Middlebar = () => {
  const [post, setPost] = useState([
    {
      sendName: "Anand Thakur",
      time: 5,
      description: "Love For All, Hatred For None !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.bQQVbujEsBtUk0iWDUEHJAHaEg&pid=Api&P=0",
      likes: 61,
      comments: 9,
    },
    {
      sendName: "Aman",
      time: 16,
      description:
        "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart !",
      imageUrl:
        "https://tse2.mm.bing.net/th?id=OIP.WDbiE3jHbfYDlgg1Zt-5MAHaEK&pid=Api&P=0",
      likes: 56,
      comments: 5,
    },
    {
      sendName: "Ajay Babu",
      time: 10,
      description:
        "Instead of worrying about what you cannot control, shift your energy to what you can create !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.w9aIHhxP0FGwBJDKvo6K2wHaE7&pid=Api&P=0",
      likes: 69,
      comments: 11,
    },
    {
      sendName: "Darshak",
      time: 15,
      description:
        "Be the reason someone smiles. Be the reason someone feels loved and believes in the goodness in people !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.fyTCzyCoP7Iw44q9fedS2QHaE8&pid=Api&P=0",
      likes: 31,
      comments: 2,
    },
    {
      sendName: "Meet",
      time: 2,
      description: "Be mindful. Be grateful. Be positive. Be true. Be kind !",
      imageUrl:
        "https://tse1.mm.bing.net/th?id=OIP.7bU94r8pJwC2OTmyaidv9wHaE4&pid=Api&P=0",
      likes: 11,
      comments: 3,
    },
    // {
    //   sendName: "Meet",
    //   time: 2,
    //   description: "Be mindful. Be grateful. Be positive. Be true. Be kind !",
    //   imageUrl:
    //     "blob:http://localhost:3000/36b0a8c8-6ef8-424c-b146-52ecb67513ad",
    //   likes: 11,
    //   comments: 3,
    // },
  ]);

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
            {/* <p className="text-muted">Want to share anything ?</p> */}
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default Middlebar;
