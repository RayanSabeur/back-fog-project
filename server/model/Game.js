import mongoose, { Schema } from "mongoose";

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
      maxlength: 1000,
  },
    comments: {
      type:[
        new Schema(
          {
            commentId: mongoose.Schema.Types.ObjectId,
          },
          { _id: false }
        )
        
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