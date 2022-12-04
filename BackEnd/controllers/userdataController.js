const profileSc = require("../models/profileModel");

const getdetails = async (req, res, next) => {
  const { userid } = req.body;
  console.log(userid);
  const getdetail = await profileSc.find({});
  let getfindetail = [];
  for (let i = 0; i < getdetail.length; i++) {
    if (getdetail[i].userid !== userid) {
      getfindetail.push(getdetail[i]);
    }
  }
  res.json(getfindetail);
};

exports.getdetails = getdetails;
