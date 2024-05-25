const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    video: [{ type: ObjectId, ref: 'Video', default: [] }],
    topWatch: [
      {
        tag: { type: String },
        count: { type: Number, default: 1 }
      }
    ],
    blockedTags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
