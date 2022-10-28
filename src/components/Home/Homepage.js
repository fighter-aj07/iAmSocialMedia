import React from "react";
import "./Homepage.css";
import Postdetails from "./Postdetails";
const Homepage = () => {
  let post = [
    {
      sendName: "Anand Thakur",
      time: 5,
      description: "Love For All, Hatred For None !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.bQQVbujEsBtUk0iWDUEHJAHaEg&pid=Api&P=0",
      likes: 61,
      comments: 9,
    },
    {
      sendName: "Aman",
      time: 16,
      description:
        "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart !",
      imageUrl:
        "https://tse2.mm.bing.net/th?id=OIP.WDbiE3jHbfYDlgg1Zt-5MAHaEK&pid=Api&P=0",
      likes: 56,
      comments: 5,
    },
    {
      sendName: "Ajay Babu",
      time: 10,
      description:
        "Instead of worrying about what you cannot control, shift your energy to what you can create !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.w9aIHhxP0FGwBJDKvo6K2wHaE7&pid=Api&P=0",
      likes: 69,
      comments: 11,
    },
    {
      sendName: "Darshak",
      time: 15,
      description:
        "Be the reason someone smiles. Be the reason someone feels loved and believes in the goodness in people !",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.fyTCzyCoP7Iw44q9fedS2QHaE8&pid=Api&P=0",
      likes: 31,
      comments: 2,
    },
    {
      sendName: "Meet",
      time: 2,
      description: "Be mindful. Be grateful. Be positive. Be true. Be kind !",
      imageUrl:
        "https://tse1.mm.bing.net/th?id=OIP.7bU94r8pJwC2OTmyaidv9wHaE4&pid=Api&P=0",
      likes: 11,
      comments: 0,
    },
  ];

  return (
    <div className="home">
      <div className="mainpage">
        <div className="left">
          <ul className="leftside">
            <li className="leftitems">
              <i className="iconsss fa-solid fa-message"></i>
              <span className="leftitemsname">Chats</span>
            </li>
            <li className="leftitems">
              <i className="iconsss fa-regular fa-rss"></i>
              <span className="leftitemsname">Feed</span>
            </li>
            <li className="leftitems">
              <i className="iconsss fa-regular fa-video"></i>
              <span className="leftitemsname">Videos</span>
            </li>
            <li className="leftitems">
              <i className="iconsss fa-regular fa-user-group"></i>
              <span className="leftitemsname">Groups</span>
            </li>
            <li className="leftitems">
              <i className="iconsss fa-regular fa-calendar"></i>
              <span className="leftitemsname">Events</span>
            </li>
            <li className="leftitems quest">
              <i className="iconsss fa-regular fa-question"></i>
              <span className="leftitemsname">Questions</span>
            </li>
          </ul>
          <ul className="leftsidebottom">
            <li className="leftitems friends">Friends</li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
            <li className="leftitemsbottom">
              <div className="imgsrc">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="profimg"
                />
                <span className="leftitemsname2">Meet Jain</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="middle container">
          <div className="middletop my-1">
            <div className="middletopbar">
              <div className="middleleftsidetop">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                  alt="Loading"
                  className="middleimageleft"
                />
              </div>
              <div className="middlerightsidetop">
                <p className="text-muted">Want to share anything ?</p>
              </div>
            </div>
            <div className="middletopbottom">
              <ul className="middletopbottomul">
                <li className="middletopbottomli">
                  <i className="fa-solid fa-photo-film"></i>
                  <span className="mx-2 fw-bold">Photo or Video</span>
                </li>
                <li className="middletopbottomli">
                  <i className="fa-solid fa-tag"></i>
                  <span className="mx-2 fw-bold">Tag</span>
                </li>
                <li className="middletopbottomli">
                  <i class="fa-solid fa-location-dot"></i>
                  <span className="mx-2 fw-bold">Location</span>
                </li>
              </ul>
            </div>
          </div>
          {post.map((element) => {
            return (
              <div className="middlebottom">
                <Postdetails
                  sendName={element.sendName}
                  time={element.time}
                  description={element.description}
                  imageUrl={element.imageUrl}
                  likes={element.likes}
                  comments={element.comments}
                />
              </div>
            );
          })}
        </div>
        <div className="right">
          <div className="righttop">
            <div className="firstt">
              <div className="firsttleft">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.RpBo_sBCV3Kpq2P3CSdKIAHaHa&pid=Api&P=0"
                  alt="Loading"
                  className="firsttleftimg"
                />
              </div>
              <div className="firsttright">
                <span className="fw-bold">Meet Jain</span>
                <span> and </span>{" "}
                <span className="fw-bold">3 other friends </span>
                <span>have their Birthday today !</span>
              </div>
            </div>
            <div className="lastt">
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.3QqovxjOUHIl5oynJPYdqgHaEJ&pid=Api&P=0"
                alt="Loading"
                className="rightimgtop"
              />
            </div>
          </div>
          <div className="rightbottom">
            <ul className="rightside">
              <li className="rightitems">
                <p className="onlinefr">Online Friends</p>
              </li>
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                    alt="Loading"
                    className="profimg"
                  />
                  <span className="rightitemsname2">Meet Jain</span>
                </div>
              </li>
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                    alt="Loading"
                    className="profimg"
                  />
                  <span className="rightitemsname2">Meet Jain</span>
                </div>
              </li>
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                    alt="Loading"
                    className="profimg"
                  />
                  <span className="rightitemsname2">Meet Jain</span>
                </div>
              </li>
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                    alt="Loading"
                    className="profimg"
                  />
                  <span className="rightitemsname2">Meet Jain</span>
                </div>
              </li>
              <li className="rightitems">
                <div className="imgsrc">
                  <div className="onli"></div>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.WkuGv4-iR5uPKZFcs7UjvAHaHs&pid=Api&P=0"
                    alt="Loading"
                    className="profimg"
                  />
                  <span className="rightitemsname2">Meet Jain</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
