import React, { useState, useEffect } from "react";
import "./Rightsidebar.css";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import Carousel from "react-bootstrap/Carousel";

const Rightsidebar = () => {
  const { sendRequest } = useRequest();
  const [userdata, setUserdata] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "https://backend-afak.onrender.com/userdata/getdetails",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("user"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setUserdata(responseData);
        //add details of friends in friendlist
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].friends.includes(localStorage.getItem("user"))) {
            setFriendlist((friendlist) => [...friendlist, responseData[i]]);
          }
        }

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
              src="https://wishes.moonzori.com/wp-content/uploads/2023/04/Happy-Birthday-Birthday-Wishes-and-Images-Moonzori.png"
              alt="Loading"
              className="firsttleftimg"
            />
          </div>
          <div className="firsttright">
            <span >No </span>
            <span>Birthdays today !</span>
          </div>
        </div>
        <div className="lastt">
          <Carousel>
            <Carousel.Item interval={5000}>
              <a href="https://www.boat-lifestyle.com/?utm_source=Affiliates&utm_medium=iCubesWire&utm_campaign=iCubesWire_dec2020" target="_blank" rel="noreferrer">
              <img
                className="d-block w-100"
                src="https://newspaperads.ads2publish.com/wp-content/uploads/2021/03/boat-your-favourite-indian-brand-by-karthik-aryan-kiara-advani-hardik-pandye-k-l-rahul-ad-times-of-india-mumbai-31-03-2021-scaled.jpg"
                alt="First slide"
                style={{
                  height: "300px",
                  width: "400px",
                  marginTop: "20px",
                  borderRadius: "20px",
                }}
              />
              </a>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
            <a href="https://www.swiggy.com/" target="_blank" rel="noreferrer">
              <img
                className="d-block"
                src="https://i.pinimg.com/550x/03/6e/4a/036e4ac5e17c4408d8efe8ac6f6b7633.jpg"
                alt="Second slide"
                style={{
                  height: "300px",
                  width: "400px",
                  marginTop: "20px",
                  borderRadius: "20px",
                }}
              />
            </a>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <a href="https://unacademy.com/" target="_blank" rel="noreferrer">
              <img
                className="d-block"
                src="https://pbs.twimg.com/media/EeLLkVkUEAQrZDN.png"
                alt="Third slide"
                style={{
                  height: "300px",
                  width: "400px",
                  marginTop: "20px",
                  borderRadius: "20px",
                }}
              />
              <Carousel.Caption></Carousel.Caption>
            </a>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="rightbottom">
        <ul className="rightside">
          <li className="rightitems">
            <p className="onlinefr">Online Friends</p>
          </li>
          {//only display my friends          
          friendlist.splice(1).map((element) => {
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
