import mongoose, { Schema } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
      },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
      },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picture: {
        type: String,
        default: "./uploads/profil/random-user.png",
    },
    bio :{
        type: String,
        max: 1024,
      },

      followers: {
        type: [String]
      },
      games: {
        type: [Object]
      },
      following: {
        type: [String]
      },
      likes: {
        type: [String]
      },
      status: {
        type: String,
        default: "user",
      },
      favoris: {
        type:[String]
      }
    },
    {
      timestamps: true,
    }
);

UserSchema.statics.login = async function(email,password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect password');
};
const maxAge =  24 * 60 * 60 * 1000;

UserSchema.methods.getJWTToken = function () {
  return  Jwt.sign({id:this._id}, process.env.TOKEN, {
    expiresIn: maxAge
  }
  )
}



const User = mongoose.model("User", UserSchema);
export default User;