import React, { useState } from "react";
import "./Postdetails.css";

const Postdetails = (props) => {
  let { sendName, time, description, imageUrl, likes, comments } = props;
  const [likecounter, setLikecounter] = useState(likes);
  const [kvalue, setKvalue] = useState(0);
  const likeHandler = () => {
    if (kvalue === 0) {
      setLikecounter(likecounter + 1);
      setKvalue(1);
    } else {
      setLikecounter(likecounter - 1);
      setKvalue(0);
    }
  };
  return (
    <div className="postcontainer">
      <div className="posttopbar">
        <div className="postleftsidetop">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
            alt="Loading"
            className="postimageleft"
          />
        </div>
        <div className="postrightsidetop">
          <p className="nameuser fw-bold">{sendName}</p>
        </div>
        <div className="postrighttime">
          <p className="text-muted">{time} mins ago</p>
        </div>
      </div>
      <div className="postdescription my-3">
        <p className="postdesc">{description}</p>
      </div>
      <div className="postimage">
        <img src={imageUrl} alt="Loading" className="postimagecon" />
      </div>
      <div className="containasset">
        <div className="postbottombar">
          <div className="postleftsidetop" onClick={likeHandler}>
            <i className="fa-regular fa-thumbs-up"></i>
          </div>
          <div className="likerighttime">
            <p className="text-muted">{likecounter} people liked it</p>
          </div>
        </div>
        <div className="comment">
          <div className="postleftsidetop commenttop">
            <i class="fa-regular fa-comment"></i>
          </div>
          <div className="likerighttime commentpost">
            <p className="text-muted">{comments} Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Postdetails;
