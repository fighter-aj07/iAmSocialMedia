import React, { useState, useEffect, useRef } from "react";
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
    likeArr,
    setCha,
  } = props;

  const [count, setCount] = useState(comment.length);
  const [likecounter, setLikecounter] = useState(likes);
  const [kvalue, setKvalue] = useState(0);
  const [lvalue, setLvalue] = useState(0);

  let [likecolor, setLikecolor] = useState("dark");
  let [dispcomment, setDispcomment] = useState("none");
  const [disabled, setDisabled] = useState(false);
  const { sendRequest } = useRequest();
  const [likeA, setLikeA] = useState(likeArr);
  let k = 0;
  let m = 0;
  const [picture1, setPicture1] = useState("");
  const [name1, setName1] = useState("");
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");

  const likeHandler = async () => {
    if (!disabled) {
      if (likeA.includes(localStorage.getItem("user"))) {
        setDisabled(true);
        const responseData = await sendRequest(
          "http://localhost:5002/posts/likeupdate",
          "POST",
          JSON.stringify({
            postid: postid,
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setLikeA(responseData.likeArr);
        console.log("like removed");
        setDisabled(false);
        // setKvalue(0);
      } else {
        setDisabled(true);
        const responseData = await sendRequest(
          "http://localhost:5002/posts/likeupdate",
          "POST",
          JSON.stringify({
            postid: postid,
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log("Like added");
        setLikeA(responseData.likeArr);
        setDisabled(false);
        // setKvalue(1);
      }
      setDisabled(false);
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
  const [comm, setComm] = useState("");
  const [commarr, setCommarr] = useState(comment);
  const dataFetchedRef = useRef(false);
  const handleOnChangeComment = (event) => {
    setComm(event.target.value);
  };
  const [newComm, setNewComm] = useState({
    id: localStorage.getItem("user"),
    content: "",
  });
  const addcommenthandler = async () => {
    setNewComm((prevState) => ({
      ...prevState,
      content: comm,
    }));
  };
  useEffect(() => {
    if (newComm.content !== "") {
      setCommarr((prevstate) => {
        let newState = [...prevstate, newComm];
        return newState;
      });
    }
  }, [newComm]);
  useEffect(() => {
    console.log("111 ", commarr);
    const fetchItems = async (req, res, next) => {
      try {
        const response = await sendRequest(
          "http://localhost:5002/posts/updatepostscomment",
          "POST",
          JSON.stringify({
            userid: postid,
            comment: [...commarr],
            comments: count,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setCha((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [commarr, count]);

  useEffect(() => {
    if (likeA.includes(localStorage.getItem("user"))) {
      setLikecolor("primary");
      setLikecounter(likecounter + 1);
    } else {
      setLikecolor("dark");
      setLikecounter(likecounter - 1);
    }
  }, [likeA]);

  // useEffect(() => {
  //   if (dataFetchedRef.current) {
  //     return;
  //   }
  //   dataFetchedRef.current = true;
  //   setNewComm((data) => {
  //     data.content = comm;
  //     return data;
  //   });
  //   setCommarr((prevstate) => {
  //     let newState = [...prevstate, newComm];
  //     return newState;
  //   });
  // }, [newComm]);

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
            <p className="text-muted">{count} Comments</p>
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
                placeholder="Write a comment... "
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
