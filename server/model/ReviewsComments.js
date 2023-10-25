


import mongoose from "mongoose";

const ReviewsCommentSchema = new mongoose.Schema(
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
    reviewid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
  },
  {
    timestamps: true,
  }

);

const ReviewsComment = mongoose.model("ReviewsComment", ReviewsCommentSchema);
export default ReviewsComment;