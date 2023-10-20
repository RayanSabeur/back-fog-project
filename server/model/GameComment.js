


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
    text:{
        type:String,
        required:"this filed is required"
    },
    game:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'GameModel'
    },
  },
  {
    timestamps: true,
  }

);

const GameComment = mongoose.model("GameComment", GameCommentSchema);
export default GameComment;