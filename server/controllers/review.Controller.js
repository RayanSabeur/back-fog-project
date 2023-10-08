import ReviewModel from '../model/review.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';
import catchAsyncError from '../middleware/catchAsyncError.js'

export const readReview = async(req, res) => {
  try {
    console.log("read review")
        const review = await ReviewModel.find();
        res.status(200).json(review);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
  };
  

export const createReview = async (req, res) => {
    // let fileName; 
    // if (req.file !== null) {
    //   try {
    //     if (
    //       req.file.detectedMimeType != "image/jpg" &&
    //       req.file.detectedMimeType != "image/png" &&
    //       req.file.detectedMimeType != "image/jpeg"
    //     )
    //       throw Error("invalid file");
  
    //     if (req.file.size > 500000) throw Error("max size");
    //   } catch (err) {
    //     const errors = uploadErrors(err);
    //     return res.status(201).json({ errors });
    //   }
    //   await pipeline(
    //     req.file.stream,
    //     fs.createWriteStream(
    //       `${__dirname}/../client/public/uploads/posts/${fileName}`
    //     )
    //   );
    // }
  
    const newReview = new ReviewModel({
      posterId: req.body.posterId,
      gameId: req.body.gameId,
      title: req.body.title,
      description: req.body.description,
      picture: req.file !== null ? "./uploads/reviews/" + req.body.posterId + Date.now() + ".jpg" : "",
      likers: [],
      release: req.body.release,
      posterName: req.body.posterName,
      comments: [],
    });
  
    try {
      const Review = await newReview.save();
      return res.status(201).json(Review);
    } catch (err) {
      return res.status(400).send(err);
    }
  };


export const deleteReview = async(req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      try {
        const deletedReview = await ReviewModel.findByIdAndRemove(req.params.id)
        res.status(200).json({deletedReview});
      } catch(err)
      {
        console.log("Delete error : " + err);
      } 
  };


  export const updateReview = async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);


    try {
      if(req.body.title != undefined) {
        await ReviewModel.findByIdAndUpdate(
          {_id: req.params.id},
          {$set:
          {
              title: req.body.title,
          } 
        },
        {new: true}
        ).then((docs) => {
          res.send(docs);
        })
      }
      if(req.body.description != undefined) {
        await ReviewModel.findByIdAndUpdate(
          {_id: req.params.id},
          {$set:
          {
              description: req.body.description,
          } 
        },
        {new: true}
        ).then((docs) => {
          res.send(docs);
        })
      }
      if(req.body.pictures != undefined) {
        await ReviewModel.findByIdAndUpdate(
          {_id: req.params.id},
          {$set:
          {
              pictures: req.body.pictures,
          } 
        },
        {new: true }
        ).then((docs) => {
          res.send(docs);
        })
      }
    } catch(err) {
      console.log('', err)
    }
  }




export const addtofavorite = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      await UserModel.findByIdAndUpdate(
       {_id: req.params.id},
        {
          $addToSet: { favoris: req.body.id },
        },
        { new: true },
       
      ).then((docs) => {
        res.send(docs);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  };

export const unlikePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await ReviewModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: "test" },
        },
        { new: true },
        (err) => {
          if (err) return res.status(400).send(err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };

export const commentReview = (req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  try {
    ReviewModel.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }    
    ).then(
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
    }
  )
} catch (err) {
  return res.status(400).send(err);
}
}

export const editCommentReview = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
      const { id } = req.params;

      try {
        return await ReviewModel.findById(id)
        .then((game) => {
        const theComment = game.comments.find((comment) =>
          comment._id.equals(req.body.id)
        );

        if (!theComment) return res.status(404).send("Comment not found");
          theComment.text = req.body.text;

        return game.save()
        .then(() => {
            res.status(201).json({
              message: 'Post saved successfully!',
              comment: theComment
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
      } catch (err) {
        return res.status(400).send(err);
      }   
    })


export const deleteCommentReview = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);  
  try {
    await ReviewModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
          comments: 
            {
              _id : new mongoose.Types.ObjectId(req.body.id)
            }
        },
    },
    { new: true }
  ).then(
    (err, docs) => {
      if (err) return res.status(500).send(err);
      res.send(docs);
    }
  );
} catch(err) {
    console.log(err)
  }

});

export const getUserReview = async (req, res) => {

  try {
   const user =  await UserModel.findOne({_id: req.params.id });
   console.log(req.params.id)
   const review = await  ReviewModel.find({  posterId: user._id })
   res.status(200).json(review)
  } catch (err) {
 
   res.status(500).json(res)
  }
 }