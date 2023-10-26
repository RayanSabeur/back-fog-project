


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
    likers: {
      type: [String],
      required: true,
    },
    text:{
        type:String,
        required:"this filed is required"
    },
    reviewid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review'
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

const ReviewsComment = mongoose.model("ReviewsComment", ReviewsCommentSchema);
export default ReviewsComment;