const postSc = require("../models/postModel");

const getposts = async (req, res, next) => {
  const getpost = await postSc.find({});
  res.json(getpost);
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
