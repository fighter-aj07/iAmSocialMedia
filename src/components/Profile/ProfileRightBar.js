import "./ProfileRightBar.css";

export default function Rightbar() {
  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
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
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
  );
}