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
  // console.log("postcontroller");
  // console.log(file);
  const fileUri = getDataUri(file);
  // console.log("fileUri ", fileUri);
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
    comment: [],
    likeArr: likeArr,
  });
  try {
    await newPosts.save();
    res.send(newPosts);
  } catch (err) {
    console.log("saving error");
  }
  // console.log(newPosts)
  //   res.json({ job: addJob });
};

const likeupdate = async (req, res) => {
  try {
    const { postMongoid, userid } = req.body;
    // const objId = mongoose.Types.ObjectId(postMongoid);
    const post = await postSc.find({ _id: postMongoid });
    console.log(post[0].likeArr);
    //check likeArr if it contains userid or it is empty
    if (post[0].likeArr.includes(userid)) {
      //if it contains userid then remove it
      const updatedPost = await postSc.findByIdAndUpdate(
        postMongoid,
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
        postMongoid,
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

const deletePost = async (req, res, next) => {
  const { userid, postid } = req.body;
  // console.log(req.body);
  // console.log("meetjainnnnn", userid, postid);
  // console.log(comment);
  try {
    let post = await postSc.findById(postid);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    if (post.userid !== userid) {
      return res.status(401).send("Not Allowed");
    }
    post = await postSc.findByIdAndDelete(postid);
    res.json({ Success: "Post has been Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.getposts = getposts;
exports.addpost = addpost;
exports.likeupdate = likeupdate;
exports.updatepostscomment = updatepostscomment;
exports.deletePost = deletePost;
