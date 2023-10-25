import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import './src/Config/db.js';
import  authRoutes from './routes/user.routes.js';
import productRoutes from './routes/gameproduct.routes.js';
import reviewRoutes from './routes/review.routes.js';
import { checkUser, requireAuth } from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();


dotenv.config({path: './.env'})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log(process.env.CLIENT_URL)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}



app.use(cors(corsOptions));
app.use('/api/user', authRoutes);
app.use('/api/user/review', reviewRoutes);
app.use('/api/gameproduct', productRoutes);
app.use('/uploads', express.static('uploads'))
  
  app.get('*', checkUser);
  app.get('/jwtid', requireAuth, (req,res) => { 
    res.status(200).send(res.locals.user._id);
  });

  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})