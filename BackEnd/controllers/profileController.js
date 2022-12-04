const profileSc = require("../models/profileModel");

const getprofiles = async (req, res, next) => {
  const getprofile = await profileSc.find({});
  res.json(getprofile);
};

exports.getprofiles = getprofiles;