import "./ProfileRightBar.css";
import EditDetails from "./EditDetails";
import { useState, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import users from "../../Database/profile";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const id = props.useridpr;
  const { sendRequest } = useRequest();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "https://backend-afak.onrender.com/profile/getprofiles",
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
  }, [sendRequest, id]);
  const showModal = (e) => {
    setShow(!show);
  };
  async function updateProfile(values) {
    try {
      const responseData = await sendRequest(
        "https://backend-afak.onrender.com/profile/updateprofile",
        "POST",
        JSON.stringify({
          userid: id,
          name: values.Name,
          city: values.City,
          from: values.From,
          relationship: values.Relationship,
          dob: values.dob,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  }
  const handleChanges = (values) => {
    setName(values.Name);
    setRelationship(values.Relationship);
    setFrom(values.From);
    setDob(values.dob);
    setCity(values.City);
    updateProfile(values);
    props.handleNameChange(values.Name);
  };
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
              {props.useridpr === localStorage.getItem("user") && (
                <button
                  className="edit-btn-rightbar"
                  onClick={(e) => {
                    showModal();
                  }}
                >
                  {" "}
                  <i class="fas fa-edit"></i>
                  {" "}
                  Edit{" "}
                </button>
              )}
              <EditDetails
                onClose={showModal}
                show={show}
                setshow = {setShow}
                key={users}
                handleChanges={handleChanges}
                id={props.id}
                rel={relationship}
                from={from}
                city={city}
                dob={dob}
                name={name}
              />
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend) => {
                return (
                  <div className="rightbarFollowing">
                    <Link to={`/profile/${friend}`} className="rightbarLink">
                      <img
                        src={
                          users.find((user) => user.userid === friend)
                            .profilePicture
                        }
                        alt=""
                        className="rightbarFollowingImg"
                      />
                    </Link>
                    <p className="rightbarFollowingName">
                      {users.find((user) => user.userid === friend).name}
                    </p>
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
