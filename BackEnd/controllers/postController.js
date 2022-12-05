const postSc = require("../models/postModel");
const profileSc = require("../models/profileModel");

const getposts = async (req, res, next) => {
  const getpost = await postSc.find({});
  res.json(getpost);

  //   try {
  //     const { userid } = req.body;
  //     const currUser = await profileSc.find({ userid: userid });
  //     const getpost = await postSc.find({ userid: userid });
  //     // console.log(getpost)
  //     const friendposts = await Promise.all(
  //       currUser[0].friends.map(async (friend) => {
  //         return await postSc.find({ userid: friend });
  //       })
  //     );
  //     res.status(200).json(getpost.concat(friendposts));
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: "Something went wrong" });
  //   }
};

const addpost = async (req, res, next) => {
  console.log(req.body);
  const {
    userid,
    sendName,
    time,
    description,
    imageUrl,
    likes,
    comments,
    comment,
  } = req.body;

  const newPosts = new postSc({
    userid: userid,
    sendName: sendName,
    time: time,
    description: description,
    imageUrl: imageUrl,
    likes: likes,
    comments: comments,
    comment: comment,
  });
  try {
    await newPosts.save();
  } catch (err) {
    console.log("saving error");
  }
  // console.log(newPosts)
  //   res.json({ job: addJob });
};

const likeupdate = async (req, res) => {
  try {
    const {postid, userid} = req.body;
    console.log(req.body);

    const post = await postSc.find({userid: postid});
    //sTORE OBJ ID FROM POST 
    const objId = post[0]._id;
    console.log("----------")
    
    //check likeArr if it contains userid or it is empty
    if(post[0].likeArr.includes(userid)){
      //if it contains userid then remove it
      const updatedPost = await postSc.findByIdAndUpdate
      (
        objId,
        {
          $pull: {likeArr: userid},
          $inc: {likes: -1}
        },
        {new: true}
      );
      res.status(200).json(updatedPost);
    }else{
      //if it does not contain userid then add it
      const updatedPost = await postSc.findByIdAndUpdate
      (
        objId,
        {
          $push: {likeArr: userid},
          $inc: {likes: 1}
        },
        {new: true}
      );
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.getposts = getposts;
exports.addpost = addpost;
exports.likeupdate = likeupdate;
