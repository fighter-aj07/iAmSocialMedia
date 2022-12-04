import React from "react";
import "./EditDetails.css"
import users from "../../Database/profile";

export default class Modal extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = e => {
            e.preventDefault();
            console.log("Form submitted");
            this.props.handleChanges(this.state);
        }
        this.currentUser = users.find(user => user.userid === this.props.id);
        console.log(this.props);
        this.state = {
            Relationship: this.props.rel,
            City: this.props.city,
            From: this.props.from,
            Name: this.props.name,
            dob: this.props.dob
        }
    }
    render() {
        if(!this.props.show){
            return null;
        }
      return (
        <div className="profile-modal">
            <div className="modal-content">
                <div className="edit-prof">Edit Profile</div>
                <form className="edit-form" onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <input className="edit-form-input" type = "text" value={this.state.Name} onChange={(e)=>{this.setState({Name: e.target.value})}} /> <br/>
                    <label>City: </label>
                    <input className="edit-form-input" type = "text" value={this.state.City} onChange={(e)=>{this.setState({City: e.target.value})}} /> <br/>
                    <label>From: </label>
                    <input className="edit-form-input" type = "text" value={this.state.From} onChange={(e)=>{this.setState({From: e.target.value})}} /> <br/>
                    <label>Relationship status: </label>
                    <input className="edit-form-input" type = "text" value={this.state.Relationship} onChange={(e)=>{this.setState({Relationship: e.target.value})}} /> <br/>
                    <label>Date of Birth: </label>
                    <input className="edit-form-input" type = "date" onChange={(e)=>{this.setState({dob: e.target.value})}} /> <br />
                    <div className="edit-form-btns">
                        <input className="edit-btns submit-btn" type="submit" value="Save Changes" />
                        <button className="close-btn edit-btns"
                            onClick={e => {
                                this.props.onClose && this.props.onClose(e);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
          </div>
        );
    }
  }