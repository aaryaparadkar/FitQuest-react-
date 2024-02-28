import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userAuth } from './api/auth.js';
import { Generate_Workout_Plan } from './api/Generate_Workout_Plan.js';
import { googlefit } from './api/googlefit.js';
import request from 'request';
import urlParse from 'url-parse';
import queryParse from 'query-string';
import axios from 'axios';
import { google } from 'googleapis';


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
app.use('/googlefit', googlefit);

app.use("/auth",userAuth);

app.get("/dashboard", async (req, res) => {
    try {
      const queryURL = new urlParse(req.url);
      const code = queryParse.parse(queryURL.query).code;
      console.log("Code:", code);
  
      const oauth2Client = new google.auth.OAuth2(
        // client id
        "6608501830-ls9rv9qneqp2h1rp40h98ephhddbevvi.apps.googleusercontent.com",
        // client secret
        "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",
        // link to redirect to
        "http://localhost:5000/googlefit/dashboard"
      );
  
      const { tokens } = await oauth2Client.getToken(code);
  
      // Use the access token to make API requests
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + tokens.access_token,
          "Content-Type": "application/json",
        },
        url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        data: {
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
              dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
            },
            {
              dataTypeName: "com.google.calories.expended",
              dataSourceId: "derived:com.google.calories.expended:com.google.android.gms:calories_burned",
            },
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: Date.now() - 6 * 60 * 60 * 1000, // 4 hours ago
          endTimeMillis: Date.now(),
        },
      });
  
      const fitnessData = result.data.bucket;
  
      try {
        for (const dataset of fitnessData) {
          for (const points of dataset.dataset) {
            for (const steps of points.point) {
              console.log("Step Count:", steps.value);
              console.log("Calories Burned:", steps.value[1].fpVal);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
  
      res.send("Fitness API requests made!");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(5000,() => console.log('Server started'));
