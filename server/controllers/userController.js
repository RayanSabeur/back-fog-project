import GameModel from '../model/Game.js';
import UserModel from '../model/User.js'
import mongoose from 'mongoose';

export const getAllUsers = async(req, res) => {
    try {
        const Users = await UserModel.find().select("-password");
        res.status(200).json(Users);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
  };

export const userInfo = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      try {
        const userdetails = await UserModel.findById(req.params.id);
        res.status(200).json(userdetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  };
  
  export const updateUser = async (req, res) => {
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
  };


// export const getUserParams = async (req, res) => {
     
//     const userId = req.query.userId;
//     const pseudo = req.query.pseudo;

  
  
//     try {
//       console.log(userId, pseudo);
//       const  user = userId
//        ? await UserModel.findById(userId) : 
//         await UserModel.findOne({pseudo: pseudo})
//       const {password, updatedAt, ...other} = user._doc

//      res.status(200).json(other)

//     } catch (err) {
      

//       res.status(500).json(err)
//     }

//   }
