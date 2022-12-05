const profileSc = require("../models/profileModel");

const getprofiles = async (req, res, next) => {
  const getprofile = await profileSc.find({});
  res.json(getprofile);
};

const getprof = async (req, res, next) => {
  const { userid } = req.body;
  const getprofiledet = await profileSc.find({ userid: userid });
  res.json(getprofiledet);
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

exports.getprofiles = getprofiles;
exports.getprof = getprof;
exports.updateProfile = updateProfile;
