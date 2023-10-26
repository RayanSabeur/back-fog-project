


import mongoose from "mongoose";

const GameCommentSchema = new mongoose.Schema(
  {
    commenterPseudo:{
        type:String,
        required: "this field is required"
    },
    commenterId:{
        type:String,
        required: "this field is required"
    },
    likers: {
      type: [String],
      required: true,
    },
    text:{
        type:String,
        required:"this filed is required"
    },
    game:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'GameModel'
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

const GameComment = mongoose.model("GameComment", GameCommentSchema);
export default GameComment;