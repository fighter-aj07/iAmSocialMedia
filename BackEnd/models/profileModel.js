const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    from: { type: String, required: true },
    dob: { type: String, required: true },
    relationship: { type: String, required: true },
    profilePicture: { type: String, required: true },
    friends: { type: Array },
});

module.exports = mongoose.model("profileModel", profileSchema);