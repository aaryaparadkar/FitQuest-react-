import express from 'express';
import mail_sender from '../mail.js';

const app = express();

app.post('/', async (req,res) => {
    try{
        const {email, excercise} = req.body;
        mail_sender(email,excercise);
        console.log(email);
        return res.status(201).json({message:"Mail Sent!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

});

export {app as mailer};