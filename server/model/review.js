import mongoose, { Schema } from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    posterId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
    },
    gameId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'GameModel', 
      required: true,
  },
    title: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 10000,
  },
    pictures: {
      type: [String],
      default: "./uploads/reviews/random-user.png",
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
    posterName: {
        type: String,
        required: true
    },
  
    rating: {
      type: Number,
      required:  true
    },
    plateform: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;