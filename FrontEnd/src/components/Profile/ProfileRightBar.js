import "./ProfileRightBar.css";
import EditDetails from "./EditDetails";
import { useState, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import users from "../../Database/profile";

// export default class Rightbar extends React.Component{
//   constructor(props){
//     super(props);
//     this.currentUser = users.find(user => user.userid === this.props.id);
//     this.friends = [];
//     this.currentUser.friends.map((friend) => {
//       this.friends.push(users.find((user) => user.userid === friend));
//     });
//     console.log(this.friends);
//     this.friendslist = [];
//     this.friends.map((friend) => {
//       this.friendslist.push(
//         <div className="rightbarFollowing">
//               <img
//                 src={friend.profilePicture}
//                 alt=""
//                 className="rightbarFollowingImg"
//               />
//               <span className="rightbarFollowingName">{friend.name}</span>
//         </div>
//       )
//     })

//     this.state = {
//       show: false,
//       Relationship: this.currentUser.relationship,
//       City: this.currentUser.city,
//       From: this.currentUser.from,
//       Name: this.currentUser.name,
//       dob: this.currentUser.dob
//     };
//     this.showModal = e => {
//       this.setState({
//         show: !this.state.show
//       });
//     };
//     this.handleChanges = (values) => {
//       console.log(values.dob);
//       this.setState({
//         Relationship: values.Relationship,
//         City: values.City,
//         From: values.From,
//         Name: values.Name,
//         dob: values.dob
//       })
//       this.props.handleNameChange(values.Name);
//     }
//   }
//     render(){
//       return (
//         <div className="rightbar">
//         <div className="rightbarWrapper">
//         <>
//           <h4 className="rightbarTitle">User information</h4>
//           <div className="rightbarInfo">
//             <div className="rightbarInfoItem">
//               <span className="rightbarInfoKey">City:</span>
//               <span className="rightbarInfoValue">{this.state.City}</span>
//             </div>
//             <div className="rightbarInfoItem">
//               <span className="rightbarInfoKey">From:</span>
//               <span className="rightbarInfoValue">{this.state.From}</span>
//             </div>
//             <div className="rightbarInfoItem">
//               <span className="rightbarInfoKey">Relationship status:</span>
//               <span className="rightbarInfoValue">{this.state.Relationship}</span>
//             </div>
//             <div className="rightbarInfoItem">
//               <span className="rightbarInfoKey">Date of Birth:</span>
//               <span className="rightbarInfoValue">{this.state.dob}</span>
//             </div>
//             <button className="edit-btn-rightbar"  onClick={e => {
//                 this.showModal();
//           }}
//             > Edit details </button>
//             <EditDetails onClose={this.showModal} show={this.state.show} handleChanges={this.handleChanges} id={this.props.id}/>
//           </div>
//           <h4 className="rightbarTitle">User friends</h4>
//           <div className="rightbarFollowings">

//             {this.friendslist}
//           </div>
//         </>
//         </div>
//       </div>
//       );
//   }
// }


export default function Profile(props) {
  const [city, setCity] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [from, setFrom] = useState([]);
  const [dob, setDob] = useState([]);
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const id = localStorage.getItem("user");
  const { sendRequest } = useRequest();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5002/profile/getprofiles",
          "POST",
          JSON.stringify({
            category: "fruit",
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setUsers(responseData);
        setCurrentUser(responseData.find((user) => user.userid === id));
        const temp = responseData.find((user) => user.userid === id);
        setRelationship(temp.relationship);
        setFrom(temp.from);
        setDob(temp.dob);
        setFriends(temp.friends);
        setCity(temp.city);
        setName(temp.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest]);
  const showModal = e => {
    setShow(!show);
  };
  const handleChanges = (values) => {
    setName(values.Name);
    setRelationship(values.Relationship);
    setFrom(values.From);
    setDob(values.dob);
    setCity(values.City);
    props.handleNameChange(values.Name);
  }
  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
        <>
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship status:</span>
              <span className="rightbarInfoValue">{relationship}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Date of Birth:</span>
              <span className="rightbarInfoValue">{dob}</span>
            </div>
            <button className="edit-btn-rightbar"  onClick={e => {
                showModal();
          }}
            > Edit details </button>
            <EditDetails onClose={showModal} show={show} key = {users} handleChanges={handleChanges} id={props.id} rel = {relationship} from = {from} city = {city} dob={dob} name={name}/>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => {
              return (
                <div className="rightbarFollowing">
                  <img
                    src={users.find((user) => user.userid === friend).profilePicture}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{users.find((user) => user.userid === friend).name}</span>
                </div>
              );
            })}
          </div>
        </>
        </div>
      </div>
    </>
  );
}
