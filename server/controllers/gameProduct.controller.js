import GameModel from '../model/Game.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';
import catchAsyncError from '../middleware/catchAsyncError.js'
import fs from "fs";
import  { promisify } from 'util';
import { Stream } from 'stream';
const pipeline = promisify(Stream.pipeline);
import { fileURLToPath } from 'url';
import { dirname } from "node:path";
import ErrorHandler from '../utils/errorHandler.js';
import GameComment from '../model/GameComment.js';


export const readGameProduct = async(req, res) => {
  try {
        const Game = await GameModel.find();
        res.status(200).json(Game);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
  };

  export const gameInfo = async(req, res) => {
    const game = await GameModel.findById(req.params.id);

    if (!game) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      game,
    });
  };

  
  

export const createGameProduct = catchAsyncError(async (req, res) => {

    let fileName; 

    console.log('test', fileName)
    const newGameProduct = new GameModel({
      posterId: req.body.posterId,
      title: req.body.title,
      picture: req.files !== null ? [] : [],
      likers: [],
      release: req.body.release,
      genres: req.body.genres,
      plateform: req.body.plateform,
      description: req.body.description,
      author: req.body.author,
      comments: [],
    });
    

    
    if (req.files) {
      let path = ''
     req.files.forEach(function(files, index, arr) {
       path = files.path
       let truepath = path.split('public')[1].replace(/\\/g, "/");

       newGameProduct.picture.push(truepath)
     })
    }
    console.log(newGameProduct)
    // if(req.files) {
    //   console.log(req.files)
    //   let path = ''
    //   req.files.forEach(function(files, index,arr) {
    //     path = path + files.path + ','
    //   })
    //   path = path.substring(0, path.lastIndexOf(","))
    //   newGameProduct.picture = path
    // }

    try {
   
      const game = await newGameProduct.save();
      return res.status(201).json(game);
    } catch (err) {
      return res.status(400).send(err);
    }
  });


export const deleteGameProduct = catchAsyncError(async(req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
        
        const deletedGame = await GameModel.findByIdAndRemove(req.params.id)
        await UserModel.collection.updateMany({}, 
          {$pull: 
            {favoris: {gameId: req.params.id}}
          }).then((docs) => {
            res.status(200).json(docs);
          })
      
        
      } catch(err)
      {
        console.log("Delete error : " + err);
      } 
  });


  export const updateGame = catchAsyncError(async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
     
      let arraytruepath = []
      let truepath;
      if (req.files) {
        let path = ''
       req.files.forEach(function(files, index, arr) {
         path = files.path
        truepath  = path.split('public')[1].replace(/\\/g, "/");
        arraytruepath.push(truepath);
       })
      }

      await GameModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$set:
        {
          title: req.body.title,
          description: req.body.description,
          genres: req.body.genres,
          author: req.body.author,
          plateform: req.body.plateform,
          release: req.body.release,
          picture: truepath ?  arraytruepath : req.body.files

        },
      },
      {new: true}
      ).then(
      (docs) => {
        res.send(docs);
      })

    } catch(err) {
      console.log('', err)
    }
  })

// export const addtofavorite = catchAsyncError(async (req, res) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id))
//       return res.status(400).send("ID unknown : " + req.params.id);

//     try {
//       // const game = GameModel.findById({_id: req.body.id}).then((docs) => { res.docs})
//       await UserModel.findByIdAndUpdate(
//        {_id: req.params.id},
//         {
//           $push: {
//             favoris: {
//               gameId: req.body.gameId,
//               status: req.body.status,
//             },
//           },
//         },
//         { new: true },
       
//       ).then((docs) => {
//         res.send(docs);
//       });
//     } catch (err) {
//       return res.status(400).send(err);
//     }
//   });

export const addtofavorite = catchAsyncError(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
return res.status(400).send("ID unknown : " + req.params.id);
    const { id } = req.params;
    
    try {
      return await UserModel.findById(id)
      .then(
        (user) => {
        const thefav = user.favoris.find((fav) =>
            fav.gameId == req.body.gameid 
      );
      if (!thefav) {
        console.log(thefav, 'thefav')
       UserModel.findByIdAndUpdate(
          {_id: req.params.id},
           {
             $push: {
               favoris: {
                 gameId: req.body.gameid,
                 status: req.body.status,
               },
             },
           },
           { new: true },
          
         ).then((docs) => {
           res.send(docs);
         });
      
      } 
      if(thefav) {
        console.log('siyafav', thefav)
        thefav.status = req.body.status;
        user.save()
        .then(() => {
            res.status(201).json({
              message: 'Post saved successfully!',
              user: thefav
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
      
    });
    } catch (err) {
      return res.status(400).send(err);
    }   
  })

export const unlikePost = catchAsyncError(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await GameModel.findByIdAndUpdate(
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
  });


export const addtothepodium = catchAsyncError(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);


      try {
        // const game = GameModel.findById({_id: req.body.id}).then((docs) => { res.docs})
        let theGame = await GameModel.findById(req.body.id)
        let test = {}
        
        test.id = theGame._id
        test.picture = theGame.picture
        test.title= theGame.title
        test.description = theGame.description
        test.plateform = theGame.plateform
        test.author = theGame.author
        test.num = req.body.num
        test.genres = theGame.genres

        if (!theGame) return res.status(404).send("Comment not found");
        await UserModel.findByIdAndUpdate
        (
          {_id: req.params.id},
            {
              $addToSet: {games: test},
            },
          { new: true },
        ).then(
          (docs) => {
            res.send(docs);
          }
        );
      } catch (err) {
        return res.status(400).send(err);
      }
    });

export const removefromthepodium = catchAsyncError(async(req, res) => {  
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

        try {
          await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: {
                games: 
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

export const commentGame = catchAsyncError(async (req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

    const {commenterId, commenterPseudo,text,game} = req.body
    const comment = new GameComment({commenterId:commenterId, commenterPseudo:commenterPseudo, text:text, game: game});
    await comment.save();
   try {
    await GameModel.findByIdAndUpdate(
      {_id: req.params.id},
       {
         $push: {
           comments: {
            commentId: comment._id,
           },
         },
       },
       { new: true },
      
     ).then((docs) => {
       res.send(docs);
     });
   } catch(err) {

   }
      
})



export const editCommentGame = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
      try {
        return await GameComment.findByIdAndUpdate(
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

    export const getAllCommentsOfGame = catchAsyncError(async(req,res) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
          const { id } = req.params;

          try {
            const game = await GameModel.findById(id);
            const gameComments = await Promise.all(
              game.comments.map((com) => {
                return GameComment.findById(com.commentId);
              })
            );

          console.log(gameComments)
            let commentList = [];
           gameComments.map((com) => {

            if(com != null) commentList.push({pseudo: com?.commenterPseudo, text: com?.text, gameId: com?.game, 
              createdAt: com.createdAt, commenterId: com.commenterId, id: com._id});
              
            });
            res.status(200).json(commentList)
          } catch (err) {
            return res.status(400).send(err);
          }   
        })

        
export const deleteCommentGame = (req,res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  const { commentid } = req.body
  try {
  const test =  GameComment.findByIdAndRemove(commentid).then(
      (err, docs) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(docs);
      }
    );
  GameModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
          comments: 
            {  
             commentId : new mongoose.Types.ObjectId(commentid)
            }
        },
    },
    { new: true }
  )
  res.status(200).json({test});
} catch(err) {
    console.log(err)
  }
}
