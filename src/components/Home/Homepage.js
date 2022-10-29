import React from "react";
import "./Homepage.css";
import Leftsidebar from "./Leftsidebar";
import Middlebar from "./Middlebar";
import Rightsidebar from "./Rightsidebar";
const Homepage = () => {
  return (
    <div className="home">
      <div className="mainpage">
        <Leftsidebar />
        <Middlebar />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Homepage;
