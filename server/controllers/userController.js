import GameModel from '../model/Game.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';
import catchAsyncError from '../middleware/catchAsyncError.js'
import GameComment from '../model/GameComment.js';
import { uploadErrors } from '../utils/error.utils.js';
import fs from 'fs';
import  { promisify } from 'util';
import { Stream } from 'stream';
const pipeline = promisify(Stream.pipeline);
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('../../', import.meta.url));
const rootDir =  __dirname


export const getAllUsers = catchAsyncError(async(req, res) => {
    try {
        const Users = await UserModel.find().select("-password");
        res.status(200).json(Users);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
  });

export const userInfo = catchAsyncError(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      try {
        const userdetails = await UserModel.findById(req.params.id).select("-password");
        res.status(200).json(userdetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  });


  export const gameCommentsUser = catchAsyncError(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {

      const currentusercomments = await GameComment.find({commenterId: req.params.id});
      console.log(currentusercomments)
      const ids = currentusercomments.map(({ game }) => game);
      const filtered = currentusercomments.filter(({ game }, index) => !ids.includes(game, index + 1));

      const games = await Promise.all(
         filtered.map((comment) => {
          return GameModel.findById(comment.game);
        })
      );

    let unique = [];
    let uniqueObject = {};
    let objTitle;

    for (let i in games) {
 
      // Extract the title
 objTitle = games[i]['_id']
      // Use the title as the index
      uniqueObject[objTitle] = games[i];
  }
  for ( let i in uniqueObject) {
      unique.push(uniqueObject[i]);
  }

  let allgamesusercomments = []
  let commentsgamesobj = {};
    

    unique.map((game) => {

         commentsgamesobj = {
          gameId: game._id,
          titlegame: game.title,
          gamepicture: game.picture[0]
          
        }
          test(commentsgamesobj)
    })

    function test  (game) { 
      filtered.map((currentcomment) => {
        if(currentcomment.game.equals(game.gameId)) {
          game.text = currentcomment.text
          game.createdAt = currentcomment.createdAt
          game.commenterId = currentcomment.commenterId
          allgamesusercomments.push(game)

        }
       
      })
  
    }
    const comment =  allgamesusercomments.map(({ gameId }) => gameId);
    const filter =  allgamesusercomments.filter(({ gameId }, index) => !comment.includes(gameId, index + 1));
    console.log('AAAAAAAAAAAAAAAAAAAAAAA',filter)
       res.status(200).json({
        message: 'Comment get succefully!',
        commentsuser: filter
      })


    } catch(err) {

      console.log(err)
    }
  });
  
  export const updateUser = catchAsyncError(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            pseudo: req.body.pseudo,
          },
        },
        { new: true }
      ).then(
        (docs) => {
               res.send(docs);
          if (err) return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  export const editStatusfavorite = catchAsyncError(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
      const { id } = req.params;
      try {
        return await UserModel.findById(id)
        .then(
          (user) => {
          const thefav = user.favoris.find((fav) =>
              fav.gameId == req.body.gameId
        );
        console.log( req.body.gameId)

        if (!thefav) return res.status(404).send("favoris not found");
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
      });
      } catch (err) {
        return res.status(400).send(err);
      }   
    })

    export const deleteFavoris = catchAsyncError(async(req,res) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);  
      try {
        await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: {
              favoris: 
                {
                  gameId : new mongoose.Types.ObjectId(req.body.gameId)
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

    export const friendUser = async (req, res) => {
    
      try {
        const user = await UserModel.findById(req.params.userId);
        const friends = await Promise.all(
          user.following.map((friendId) => {
            return UserModel.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, pseudo, picture } = friend;
          friendList.push({ _id, pseudo, picture });
        });
        res.status(200).json(friendList)
      } catch (err) {
        res.status(500).json(err);
      }
    ;
  }
    

export const getUserParams = async (req, res) => {
     
    const userId = req.query.userId;
    const pseudo = req.query.pseudo;
  
    try {
      console.log(userId, pseudo);
      const  user = userId
       ?  await UserModel.findById(userId) : 
        await UserModel.findOne({pseudo: pseudo})
      const {password, updatedAt, ...other} = user._doc

     res.status(200).json(other)

    } catch (err) {
      

      res.status(500).json(err)
    }

  }




export const uploadProfil = async (req, res, next) => {
 
  // const fileName = req.body.name + ".jpg";
  try {
    
    if(req.file) {
      
    await UserModel.findByIdAndUpdate(
      req.body.userId,
        { $set: { picture: req.file.path.split('public')[1].replace(/\\/g, "/") } },
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
    }
      
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
