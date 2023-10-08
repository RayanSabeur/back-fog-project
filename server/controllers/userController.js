import GameModel from '../model/Game.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';
import catchAsyncError from '../middleware/catchAsyncError.js'

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
        const userdetails = await UserModel.findById(req.params.id);
        res.status(200).json(userdetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
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
       ? await UserModel.findById(userId) : 
        await UserModel.findOne({pseudo: pseudo})
      const {password, updatedAt, ...other} = user._doc

     res.status(200).json(other)

    } catch (err) {
      

      res.status(500).json(err)
    }

  }
