import express from 'express';
import { userProfModel } from '../models/userprof.js';

const app = express();

app.post("/profile", async (req, res) => {
    try {
        const { username, gender, frequency, status, goal, age, weight } = req.body;;

        const newProf = new userProfModel({username, gender, frequency, status, goal, age, weight});
        await newProf.save();
        res.status(201).json({ message: 'Profile saved successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/getprofile', async(req,res) => {
    try{
        const username = req.query.username;    
        const userdata = await userProfModel.findOne({username});
        res.json(userdata);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export { app as userProf };
