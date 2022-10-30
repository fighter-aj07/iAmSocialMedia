import "./ProfileRightBar.css";
import EditDetails from "./EditDetails"
import React from "react";
import { render } from "@testing-library/react";

export default class Rightbar extends React.Component{
  constructor(){
    super();
    this.state = {
      show: false,
      Relationship: "Not set",
      City: "Not set",
      From: "Not set",
      Name: "Meet Jain",
    };
    this.showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };
    this.handleChanges = (values) => {
      console.log("Form submitted");
      this.setState({
        Relationship: values.Relationship,
        City: values.City,
        From: values.From,
        Name: values.Name,
      })
      this.props.handleNameChange(values.Name);
    }
  }
    render(){
      return (
        <div className="rightbar">
        <div className="rightbarWrapper">
        <>
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{this.state.City}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{this.state.From}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{this.state.Relationship}</span>
            </div>
            <button className="edit-btn-rightbar"  onClick={e => {
                this.showModal();
          }}
            > Edit details </button>
            <EditDetails onClose={this.showModal} show={this.state.show} handleChanges={this.handleChanges}/>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Meet Jain</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Meet Jain</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Meet Jain</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Meet Jain</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Meet Jain</span>
            </div>
          </div>
        </>
        </div>
      </div>
      );
  }
}