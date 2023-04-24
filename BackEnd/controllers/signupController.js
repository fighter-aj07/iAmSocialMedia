const loginsc = require("../models/loginModel");
const profileSc = require("../models/profileModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { email, password, userid, username } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      "$2b$12$0nH6Joxv6U00I6UJm6gbk.6UxLJlmTbh37wT/cY8mwJW.cxxv3/N2"
    );

    const temp = await loginsc.findOne({ email });
    if (temp) {
      return res.status(403).json({ message: "Email already exists" });
    }

    const user = new loginsc({
      email,
      password: hashedPassword,
      userid,
      username,
    });
    await user.save();

    const newProfile = new profileSc({
      userid,
      name: username,
      city: "Not set",
      from: "Not set",
      relationship: "Not set",
      dob: "2000-01-01",
      profilePicture:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    });
    await newProfile.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signup = signup;
