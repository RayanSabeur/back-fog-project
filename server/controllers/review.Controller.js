import ReviewModel from '../model/review.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';
import catchAsyncError from '../middleware/catchAsyncError.js'
import ReviewsComment from '../model/ReviewsComments.js';

export const readReview = async(req, res) => {
  try {
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
      pictures: req.files !== null ? [] : [],
      likers: [],
      release: req.body.release,
      posterName: req.body.posterName,
      rating: req.body.rating,
      plateform: req.body.plateform,
    });

    if (req.files) {
      let path = ''
     req.files.forEach(function(files, index, arr) {
       path = files.path
       let truepath = path.split('public')[1].replace(/\\/g, "/");

       newReview.pictures.push(truepath)
     })
    }
  
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
        console.log(req.params.id)
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
     
      let arraytruepath = []
      let truepath;
      console.log(req.files)
      if (req.files) {
        let path = ''
       req.files.forEach(function(files, index, arr) {
         path = files.path
        truepath  = path.split('public')[1].replace(/\\/g, "/");
        arraytruepath.push(truepath);
       })
      }
        await ReviewModel.findByIdAndUpdate(
          {_id: req.params.id},
          {$set:
          {
            posterId: req.body.posterId,
            gameId: req.body.gameId,
            title: req.body.title,
            description: req.body.description,
            pictures: req.files !== null ? arraytruepath : req.body.files,
            likers: [],
            release: req.body.release,
            posterName: req.body.posterName,
            rating: req.body.rating,
            plateform: req.body.plateform,
          } 
        },
        {new: true}
        ).then((docs) => {
          res.send(docs);
        })
      
  
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

  export const getAllCommentsOfReview = catchAsyncError(async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
        const { id } = req.params;

        try {
          const revewComments = await ReviewsComment.find({reviewid: id});
          let commentList = [];
          revewComments.map((com) => {

          if(com != null) commentList.push({pseudo: com?.commenterPseudo, text: com?.text, reviewId: com?.reviewid, 
            createdAt: com.createdAt, commenterId: com.commenterId, id: com._id, comments: com.comments});
            
          });
          console.log(commentList)
          res.status(200).json(commentList)
        } catch (err) {
          return res.status(400).send(err);
        }   
      })



export const commentReview = async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

 try {
  const {commenterId, commenterPseudo,text, reviewid} = req.body
  const comment = new ReviewsComment({commenterId:commenterId, commenterPseudo:commenterPseudo, text:text, reviewid: reviewid});
  await comment.save();
  
 } catch(err) {

 }
}

export const editCommentReview = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return await ReviewsComment.findByIdAndUpdate(
      {_id: req.body.currentmsg},
      {$set:
      {
        text: req.body.text,
      },
    },
    {new: true})
    .then((docs) => {
      res.send(docs)
  });
  } catch (err) {
    return res.status(400).send(err);
  }    
    })

export const deleteCommentReview = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  const { commentid } = req.body
  try {
  const test =  ReviewsComment.findByIdAndRemove(commentid).then(
      (err, docs) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(docs);
      }
    );
  
  res.status(200).json({test});
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

 
export const getCurrentReview = async (req, res) => {

  try {
   const review = await  ReviewModel.findOne({_id: req.params.id })
   res.status(200).json(review)
  } catch (err) {
 
   res.status(500).json(res)
  }
 }


 export const commentPostReview = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return ReviewsComment.findByIdAndUpdate(
      req.params.id,
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
    ).then((err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      })
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const editCommentPostReview = async(req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  const { id } = req.params;
    
      
  try {
    return  await  ReviewsComment.findById(id).then((com) => {
      const theComment = com.comments.find((comment) =>
        comment._id == req.body.commentId
      );
      console.log(theComment)
      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return com.save().then((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const deleteCommentPostReview = async(req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  try {
      await  ReviewsComment.findOneAndUpdate(
      {_id: req.params.id},
      {
        $pull: {
          comments: {
            _id: new mongoose.Types.ObjectId(req.body.commentId),
          },
        },
      },
      { new: true }
      ).then(
        (docs) => {
          res.send(docs);
        }
      );
    } catch(err) {
        console.log(err)
  }
};
