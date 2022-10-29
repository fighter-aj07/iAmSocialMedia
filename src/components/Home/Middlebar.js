import React from "react";
import "./Middlebar.css";
import Postdetails from "./Postdetails";

const Middlebar = () => {
  let post = [
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
  ];

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
            <p className="text-muted">Want to share anything ?</p>
          </div>
        </div>
        <div className="middletopbottom">
          <ul className="middletopbottomul">
            <li className="middletopbottomli">
              <i className="fa-solid fa-photo-film"></i>
              <span className="mx-2 fw-bold">Photo or Video</span>
            </li>
            <li className="middletopbottomli">
              <i className="fa-solid fa-tag"></i>
              <span className="mx-2 fw-bold">Tag</span>
            </li>
            <li className="middletopbottomli">
              <i className="fa-solid fa-location-dot"></i>
              <span className="mx-2 fw-bold">Location</span>
            </li>
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
