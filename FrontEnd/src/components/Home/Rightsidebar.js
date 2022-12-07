import React, { useState, useEffect } from "react";
import "./Rightsidebar.css";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";

const Rightsidebar = () => {
  const { sendRequest } = useRequest();
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/userdata/getdetails",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setUserdata(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest]);

  return (
    <div className="right">
      <div className="righttop">
        <div className="firstt">
          <div className="firsttleft">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.RpBo_sBCV3Kpq2P3CSdKIAHaHa&pid=Api&P=0"
              alt="Loading"
              className="firsttleftimg"
            />
          </div>
          <div className="firsttright">
            <span className="fw-bold">Meet Jain</span>
            <span> and </span> <span className="fw-bold">3 other friends </span>
            <span>have their Birthday today !</span>
          </div>
        </div>
        <div className="lastt">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.3QqovxjOUHIl5oynJPYdqgHaEJ&pid=Api&P=0"
            alt="Loading"
            className="rightimgtop"
          />
        </div>
      </div>
      <div className="rightbottom">
        <ul className="rightside">
          <li className="rightitems">
            <p className="onlinefr">Online Friends</p>
          </li>
          {userdata.slice(1).map((element) => {
            return (
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <Link
                    to={"/profile/" + element.userid}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={element.profilePicture}
                      alt="Loading"
                      className="profimg"
                    />
                  </Link>
                  <span className="rightitemsname2">{element.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Rightsidebar;
