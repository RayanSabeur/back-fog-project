import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
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
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("Game", GameSchema);
export default GameModel;