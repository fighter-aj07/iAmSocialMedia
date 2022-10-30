import React from "react";
import "./EditDetails.css"

export default class Modal extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = e => {
            e.preventDefault();
            console.log("Form submitted");
            this.props.handleChanges(this.state);
        }
        this.state = {
            Relationship: "Not set",
            City: "Not set",
            From: "Not set",
            Name: "Meet Jain",
            DOB: "Not set"
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
                    <input className="edit-form-input" type = "date" /> <br />
                    <input className="edit-btns submit-btn" type="submit" value="Save Changes" />
                    <button className="close-btn edit-btns"
                        onClick={e => {
                            this.props.onClose && this.props.onClose(e);
                        }}
                    >
                        Close
                    </button>
                </form>
            </div>
          </div>
        );
    }
  }