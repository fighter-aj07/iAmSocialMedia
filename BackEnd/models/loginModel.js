const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    userid: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = mongoose.model("loginModel", loginSchema);
