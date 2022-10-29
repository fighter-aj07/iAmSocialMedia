import React from "react";
import "./Comment.css";

const Comment = () => {
  return (
    <>
      <div className="commentimg">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
          alt="Loading"
          className="profimgcomment"
        />
        <span className="commentitemsname">Meet Jain</span>
        <span className="commentitemsname2 text-muted">2 mins ago</span>
      </div>
      <div className="commenttext">
        <div className="ptag">
          <p className="commenttextptag">Wow !!</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
