import User from '../model/User.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { sendToken } from '../middleware/auth.middleware.js';


// const jwt = require('jsonwebtoken');
// const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge =  24 * 60 * 60 * 1000;


export const signUp = async (req, res) => {
 
const {pseudo, email, password} = req.body

try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
        pseudo,
        email,
        password: passwordHash,
      });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}
catch(err) {
    // const errors = signUpErrors(err);
    // res.status(200).send({errors}) //utils errors
}
}

export const signIn = async (req,res) => {

    const { email, password } = req.body 

    try {
        const user = await User.login(email, password);
        const token = sendToken(user, 201, res);

    } catch (err) {
        res.status(200).json(err);
    }
}

export const logout = (req, res) => {
        res.cookie("jwt", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json('deconnecté')
        res.redirect('/');
    }

