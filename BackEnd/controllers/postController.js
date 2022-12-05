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

exports.getposts = getposts;
exports.addpost = addpost;
