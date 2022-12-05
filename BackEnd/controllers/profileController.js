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

exports.getprofiles = getprofiles;
exports.getprof = getprof;
