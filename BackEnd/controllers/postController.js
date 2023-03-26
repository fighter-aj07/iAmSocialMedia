const postSc = require("../models/postModel");
const profileSc = require("../models/profileModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const getposts = async (req, res, next) => {
  const getpost = await postSc.find({});
  res.json(getpost);
};

const addpost = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const {
    userid,
    sendName,
    time,
    description,
    likes,
    comments,
    comment,
    likeArr,
  } = req.body;
  const file = req.file;
  console.log("postcontroller");
  console.log(file);
  const fileUri = getDataUri(file);
  console.log("fileUri ", fileUri);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);

  const cloudimageurl = mycloud.secure_url;

  const newPosts = new postSc({
    userid: userid,
    sendName: sendName,
    time: time,
    description: description,
    imageUrl: cloudimageurl,
    likes: likes,
    comments: comments,
    comment: comment,
    likeArr: likeArr,
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
    const { postid, userid } = req.body;

    const post = await postSc.find({ userid: postid });
    //sTORE OBJ ID FROM POST
    const objId = post[0]._id;
    console.log("----------");

    //check likeArr if it contains userid or it is empty
    if (post[0].likeArr.includes(userid)) {
      //if it contains userid then remove it
      const updatedPost = await postSc.findByIdAndUpdate(
        objId,
        {
          $pull: { likeArr: userid },
          $inc: { likes: -1 },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      //if it does not contain userid then add it
      const updatedPost = await postSc.findByIdAndUpdate(
        objId,
        {
          $push: { likeArr: userid },
          $inc: { likes: 1 },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updatepostscomment = async (req, res, next) => {
  const { userid, comment, comments } = req.body;
  // console.log(comment);
  try {
    const result = await postSc.updateMany(
      { userid: userid },
      {
        $set: {
          comments: comments,
          comment: comment,
        },
      }
    );
    res.json("success");
  } catch (err) {
    console.log(err);
  }
};

exports.getposts = getposts;
exports.addpost = addpost;
exports.likeupdate = likeupdate;
exports.updatepostscomment = updatepostscomment;
