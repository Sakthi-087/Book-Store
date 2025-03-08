import express from "express";
import {PORT, mongoDBUrl} from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express()

//Middleware for parsing request
app.use(express.json())

//Middleware for handling CORPS policy
//Option 1: Allow All Origin with Default of cors(*)
app.use(cors())

//Option 2: Allow Custom Origins
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/


app.get('/', (req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome to MERN Stack Tutorial")
})

app.use('/books', booksRoute)


app.listen(PORT, ()=>{
    console.log(`Port running successfully on : localhost://${PORT}`)
})

mongoose
    .connect(mongoDBUrl)
    .then(()=>{
        console.log('App connected to database');
    })
    .catch((error)=>{
        console.log(error)
    })