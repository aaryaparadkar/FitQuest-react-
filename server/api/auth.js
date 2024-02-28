import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/users.js';

const app = express();

app.post("/signup", async (req, res) => {
    try {
        const credentials = req.body;
        const { email, password } = credentials;
        console.log(credentials);

        const atIndex = email.indexOf("@");
        const username = atIndex !== -1 ? email.substring(0, atIndex) : email;

        const user = await userModel.findOne({ username });
        const existingEmailUser = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'Username is already taken' });
        }
        if (existingEmailUser) {
            return res.status(404).json({ message: 'Account already exists with the above email id' });
        } 

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPass });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/login', async (req,res) => {
    try{
        const {email, pwd} = req.body;
        console.log(email, pwd);
        const user = await userModel.findOne({email});
        if (user){
            const validPass = await bcrypt.compare(pwd,user.password);
            if (validPass){
                return res.status(200).json({message:"Login successfull", username: user.username});
            }
            else{
                return res.status(401).json({message:"Invalid Password"});
            }
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export { app as userAuth };
