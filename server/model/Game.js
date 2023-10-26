import mongoose, { Schema } from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    posterId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
     },
    title: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: [String],
      default: "./uploads/profil/random-user.png",
      required: true,
    },
    
    likers: {
      type: [String],
      required: true,
    },
    release: {
      type: [Date],
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    plateform: {
      type: [String],
      required: true,
    },
    author: {
      type:[String],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1500,
  },

  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("Game", GameSchema);
export default GameModel;