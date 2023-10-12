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


export const readGameProduct = async(req, res) => {
  try {
        const Game = await GameModel.find();
        res.status(200).json(Game);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
  };
  

export const createGameProduct = catchAsyncError(async (req, res) => {

    let fileName; 
  
    // console.log(req.files);
  
    // if (req.files) {
    //   console.log(req.files)
    //   let path = ''
    //  req.files.forEach(function(files, index, arr) {
    //    path = path + files.path + ','
    //  })
    //  path = path.substring(0, path.lastIndexOf(','))
    //  newGameProduct.picture = path
    // }

    console.log(req.file)
    if (req.file !== null) {
      try {
        if (
          req.file.detectedMimeType != "image/jpg" &&
          req.file.detectedMimeType != "image/png" &&
          req.file.detectedMimeType != "image/jpeg"
        )
          throw Error("invalid file");
  
        if (req.file.size > 500000) throw Error("max size");
      } catch (err) {
        return res.status(201).json(err);
      }
      fileName = req.body.posterId + Date.now() + ".jpg";
      const rootDir = dirname(process.argv[1]);

      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${rootDir}/../client/public/uploads/games/${fileName}`
        )
      );
    }

    const newGameProduct = new GameModel({
      posterId: req.body.posterId,
      title: req.body.title,
      picture: req.file !== null ? "./uploads/games/" + fileName : "",
      likers: [],
      release: req.body.release,
      genres: req.body.genres,
      plateform: req.body.plateform,
      description: req.body.description,
      author: req.body.author,
      comments: [],
    });

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
        res.status(200).json({deletedGame});
      } catch(err)
      {
        console.log("Delete error : " + err);
      } 
  });


  export const updateGame = catchAsyncError(async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      await GameModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$set:
        {
          title: req.body.title,
        } 
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

export const addtofavorite = catchAsyncError(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      // const game = GameModel.findById({_id: req.body.id}).then((docs) => { res.docs})
      await UserModel.findByIdAndUpdate(
       {_id: req.params.id},
        {
          $push: {
            favoris: {
              gameId: req.body.gameId,
              status: req.body.status,
            },
          },
        },
        { new: true },
       
      ).then((docs) => {
        res.send(docs);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });

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
        const theGame = await GameModel.findById(req.body.id)
        if (!theGame) return res.status(404).send("Comment not found");

        await UserModel.findByIdAndUpdate
        (
          {_id: req.params.id},
            {
              $addToSet: { games: theGame },
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

export const commentGame = (req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

  try {
    GameModel.findByIdAndUpdate(
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

export const editCommentGame = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
      const { id } = req.params;
      try {
        return await GameModel.findById(id)
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


export const deleteCommentGame = catchAsyncError(async(req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);  
  try {
    await GameModel.findOneAndUpdate(
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
})
