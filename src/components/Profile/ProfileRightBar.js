import "./ProfileRightBar.css";
import EditDetails from "./EditDetails"
import React from "react";
import users from "../../Database/profile";

export default class Rightbar extends React.Component{
  constructor(props){
    super(props);
    this.currentUser = users.find(user => user.userid === this.props.id);
    this.friends = [];
    this.currentUser.friends.map((friend) => {
      this.friends.push(users.find((user) => user.userid === friend));
    });
    console.log(this.friends);
    this.friendslist = [];
    this.friends.map((friend) => {
      this.friendslist.push(
        <div className="rightbarFollowing">
              <img
                src={friend.profilePicture}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.name}</span>
        </div>
      )
    })

    this.state = {
      show: false,
      Relationship: this.currentUser.relationship,
      City: this.currentUser.city,
      From: this.currentUser.from,
      Name: this.currentUser.name,
      dob: this.currentUser.dob
    };
    this.showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };
    this.handleChanges = (values) => {
      console.log(values.dob);
      this.setState({
        Relationship: values.Relationship,
        City: values.City,
        From: values.From,
        Name: values.Name,
        dob: values.dob
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
              <span className="rightbarInfoKey">Relationship status:</span>
              <span className="rightbarInfoValue">{this.state.Relationship}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Date of Birth:</span>
              <span className="rightbarInfoValue">{this.state.dob}</span>
            </div>
            <button className="edit-btn-rightbar"  onClick={e => {
                this.showModal();
          }}
            > Edit details </button>
            <EditDetails onClose={this.showModal} show={this.state.show} handleChanges={this.handleChanges} id={this.props.id}/>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">

            {this.friendslist}
          </div>
        </>
        </div>
      </div>
      );
  }
}