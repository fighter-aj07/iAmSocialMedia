import React, { useState, useEffect } from "react";
import "./Rightsidebar.css";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import Carousel from 'react-bootstrap/Carousel';

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
              src="https://wishes.moonzori.com/wp-content/uploads/2023/04/Happy-Birthday-Birthday-Wishes-and-Images-Moonzori.png"
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
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://newspaperads.ads2publish.com/wp-content/uploads/2021/03/boat-your-favourite-indian-brand-by-karthik-aryan-kiara-advani-hardik-pandye-k-l-rahul-ad-times-of-india-mumbai-31-03-2021-scaled.jpg"
              alt="First slide"
              style={{height:"300px", width:"400px", marginTop: "20px"}}
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block"
              src="https://i.pinimg.com/550x/03/6e/4a/036e4ac5e17c4408d8efe8ac6f6b7633.jpg"
              alt="Second slide"
              style={{height:"300px", width:"400px", marginTop: "20px"}}
            />
          
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://pbs.twimg.com/media/EeLLkVkUEAQrZDN.png"
              alt="Third slide"
              style={{height:"300px", width:"400px", marginTop: "20px"}}
            />
            <Carousel.Caption>
          
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
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
