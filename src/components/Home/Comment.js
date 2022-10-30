import React from "react";
import "./Comment.css";
import users from "../../Database/profile";

const Comment = (props) => {
  const { comdescrip, userId } = props;
  const userDet = users.find((user) => user.userid === userId);

  return (
    <>
      <div className="commentimg">
        <img
          src={userDet.profilePicture}
          alt="Loading"
          className="profimgcomment"
        />
        <span className="commentitemsname">{userDet.name}</span>
        <span className="commentitemsname2 text-muted">2 mins ago</span>
      </div>
      <div className="commenttext">
        <div className="ptag">
          <p className="commenttextptag">{comdescrip}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
