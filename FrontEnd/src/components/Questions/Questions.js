import React from "react";
import Navbar from "../Navbar/Navbar";
import Contact from "./Contact";
import FaqQuestions from "./FaqQuestions";
import Header from "./Header";

const Questions = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <FaqQuestions />
      <Contact />
    </div>
  );
};

export default Questions;
