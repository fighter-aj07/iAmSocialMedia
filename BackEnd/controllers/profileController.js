const profileSc = require("../models/profileModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const getprofiles = async (req, res, next) => {
  const getprofile = await profileSc.find({});
  res.json(getprofile);
};

const getprof = async (req, res, next) => {
  const { userid, projection } = req.body;
  const getprofiledet = await profileSc.find({ userid: userid }, projection);
  // console.log("prof: ", getprofiledet);
  if(getprofiledet.length > 0)res.status(200).json(getprofiledet);
  else res.status(404).json({message: "User not found"});
};

const updateProfile = async (req, res, next) => {
  const { userid, name, city, from, relationship, dob } = req.body;
  console.log("recieved", userid, name, city, from, relationship, dob);
  const updateprofile = await profileSc.updateOne(
    { userid: userid },
    {
      $set: {
        name: name,
        city: city,
        from: from,
        relationship: relationship,
        dob: dob,
      },
    }
  );
  res.json(updateprofile);
};

const updateProfilePicture = async (req, res, next) => {
  const file = req.file;
  const { userid } = req.body;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);
  const cloudimageurl = mycloud.secure_url;
  const updateprofile = await profileSc.updateOne(
    { userid: userid },
    {
      $set: {
        profilePicture: cloudimageurl,
      },
    }
  );
  res.json(updateprofile);
};
const addOrRemoveFriend = async (userId, friendId, shouldAdd) => {
  if(shouldAdd){
    const addFriend = await profileSc.updateOne(
      { userid: userId },
      {
        $push: {
          friends: friendId,
        },
      }
    );
    const addFriend2 = await profileSc.updateOne(
      { userid: friendId },
      {
        $push: {
          friends: userId,
        },
      }
    );
    return addFriend;
  }
  else{
    const removeFriend = await profileSc.updateOne(
      { userid: userId },
      {
        $pull: {
          friends: friendId,
        },
      }
    );
    const removeFriend2 = await profileSc.updateOne(
      { userid: friendId },
      {
        $pull: {
          friends: userId,
        },
      }
    );
    return removeFriend;
  }
};


const addFriend = async (req, res, next) => {
  console.log(req.body);
  const { userid, friendid } = req.body;
  const checkFriend = await profileSc.find({
    userid: userid,
    friends: friendid,
  });
  console.log(checkFriend);
  if (checkFriend.length > 0) {
    const removeFriend = await addOrRemoveFriend(userid, friendid, false);
    res.json(removeFriend);
    console.log("removing friend");
    return;
  }
  console.log("adding friend");
  const addFriend = await addOrRemoveFriend(userid, friendid, true);
  res.json(addFriend);
};

exports.addFriend = addFriend;
exports.getprofiles = getprofiles;
exports.getprof = getprof;
exports.updateProfile = updateProfile;
exports.updateProfilePicture = updateProfilePicture;
