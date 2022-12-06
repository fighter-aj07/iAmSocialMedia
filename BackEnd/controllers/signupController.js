const loginsc = require('../models/loginModel');
const profileSc = require("../models/profileModel");
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { email, password, userid, username } = req.body;
    const temp = await loginsc.findOne({email});
    if(temp){
        res.status(403).json({message: 'Email already exists'});
    }
    else {
        const user = new loginsc({
            email: email,
            password: password,
            userid: userid,
            username: username,
        });
        try {
            await user.save();
        } catch (err) {
            console.log(err);
        }
        const newProfile = new profileSc({
            userid: userid,
            name: username,
            city: "Not set",
            from: "Not set",
            relationship: "Not set",
            dob: "2000-01-01",
            profilePicture: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        });
        try {
            await newProfile.save();
            res.status(200).json("success");
        }
            catch (err) {
            console.log(err);
            }
        }
};

exports.signup = signup;
