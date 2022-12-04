const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userid: { type: String, required: true },
  sendName: { type: String, required: true },
  time: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  comment: { type: Array },
});

module.exports = mongoose.model("postModel", postSchema);
