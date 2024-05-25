const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true
    },
    age: {
        type: Number,
        required: true
    },
    tag: {
        type: Array,
        default: [],
        required: true
    },
    url:{
        type: String,
        required: true
    },

  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
