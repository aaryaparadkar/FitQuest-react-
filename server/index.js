import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userAuth } from './api/auth.js';
import { Generate_Workout_Plan } from './api/Generate_Workout_Plan.js';
import { xyz } from './api/gemini.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url)
.then(() => {
    console.log('DB connected!');
})
.catch((err) => {
    console.log(`DB conection failed: ${err}`);
});

app.post('/', ( req, res ) => {
    console.log('Hello world');
    res.status(200).json({message:'Success'});
})

app.use('/generateWorkoutPlan', Generate_Workout_Plan);

app.use("/auth",userAuth,xyz);

app.listen(5000,() => console.log('Server started'));
