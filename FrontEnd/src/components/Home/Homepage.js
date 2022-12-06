import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Homepage.css";
import Leftsidebar from "./Leftsidebar";
import Middlebar from "./Middlebar";
import Rightsidebar from "./Rightsidebar";
const Homepage = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="mainpage">
        <Leftsidebar />
        <Middlebar dispID={"all"} />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Homepage;
