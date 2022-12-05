import React, { useState, useEffect } from "react";
import "./Postdetails.css";
import Comment from "./Comment";

import { useRequest } from "../../hooks/request-hook";

const Postdetails = (props) => {
  let {
    sendName,
    time,
    description,
    imageUrl,
    likes,
    comments,
    comment,
    postid,
  } = props;
  const [likecounter, setLikecounter] = useState(likes);
  const [kvalue, setKvalue] = useState(0);
  const [lvalue, setLvalue] = useState(0);
  const [comm, setComm] = useState("");
  let [likecolor, setLikecolor] = useState("dark");
  let [dispcomment, setDispcomment] = useState("none");
  // const userDet = users.find((user) => user.name === sendName);

  const likeHandler = () => {
    if (kvalue === 0) {
      setLikecounter(likecounter + 1);
      setKvalue(1);
      setLikecolor("primary");
    } else {
      setLikecounter(likecounter - 1);
      setKvalue(0);
      setLikecolor("dark");
    }
  };

  const commentHandler = () => {
    if (lvalue === 0) {
      setLvalue(1);
      setDispcomment("block");
    } else {
      setLvalue(0);
      setDispcomment("none");
    }
  };
  const handleOnChangeComment = (event) => {
    setComm(event.target.value);
  };

  const addcommenthandler = () => {};

  let k = 0;
  let m = 0;
  const [picture1, setPicture1] = useState("");
  const [name1, setName1] = useState("");
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  // const userDet = users.find((user) => user.userid === userId);
  const { sendRequest } = useRequest();
  useEffect(() => {
    const fetchItems = async (req, res, next) => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/getprof",
          "POST",
          JSON.stringify({
            userid: postid,
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

    const fetchItems2 = async (req, res, next) => {
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
        setName1(responseData[0].name);
        setPicture1(responseData[0].profilePicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
    fetchItems2();
  }, [sendRequest]);
  return (
    <div className="postcontainer">
      <div className="posttopbar">
        <div className="postleftsidetop">
          <img src={picture} alt="Loading" className="postimageleft" />
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
          <div
            className={`postleftsidetop text-${likecolor}`}
            onClick={likeHandler}
          >
            <i className="fa-regular fa-thumbs-up"></i>
          </div>
          <div className="likerighttime">
            <p className="text-muted">{likecounter} people liked it</p>
          </div>
        </div>
        <div className="comment">
          <div className="postleftsidetop commenttop" onClick={commentHandler}>
            <i className="fa-regular fa-comment"></i>
          </div>
          <div className="likerighttime commentpost">
            <p className="text-muted">{comments} Comments</p>
          </div>
        </div>
      </div>
      <div className={`commentboxx my-2 d-${dispcomment}`}>
        <ul className="displaycomment">
          <div className="addcomment">
            <img src={picture1} alt="Loading" className="profimgcomment" />
            <span className="commentitemsname">{name1}</span>
          </div>
          <div className="addcommenthere">
            <div className="hereee">
              <input
                type="text"
                placeholder="Write a comment "
                className="adcom"
                onChange={handleOnChangeComment}
              />
              <span className="commentitemsname">
                <button className="addcombutt" onClick={addcommenthandler}>
                  Post
                </button>
              </span>
            </div>
          </div>
          {comment.map((element) => {
            return (
              <li className="commentitems">
                <Comment
                  comdescrip={comment[k++].content}
                  userId={comment[m++].id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Postdetails;
