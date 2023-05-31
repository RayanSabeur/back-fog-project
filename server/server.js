import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

dotenv.config({path: './.env'})


app.use(express.urlencoded({extended: true}));
app.use(express.json())

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  
  app.use(cors(corsOptions));
  console.log(process.env.PORT)
  app.listen(process.env.PORT, () => {

    console.log(`listening on port ${process.env.PORT}`)
})