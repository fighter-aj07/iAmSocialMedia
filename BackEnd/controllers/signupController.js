const loginsc = require('../models/loginModel');
const profileSc = require("../models/profileModel");
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { email, password, userid } = req.body;
    const temp = await loginsc.findOne({email});
    if(temp){
        res.json('Email already exists');
    }
    const user = new loginsc({
        email: email,
        password: password,
        userid: userid
    });
    try {
        await user.save();
      } catch (err) {
        console.log("saving error");
      }
    const newProfile = new profileSc({
        userid: userid,
        name: "Not set",
        city: "Not set",
        from: "Not set",
        relationship: "Not set",
        dob: "2000-01-01",
    });
    try {
        await newProfile.save();
        res.json("success");
      }
        catch (err) {
        console.log("saving error");
        }

};

exports.signup = signup;
