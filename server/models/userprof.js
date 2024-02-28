import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    gender: {type:String, required:true},
    frequency: {type:String, required:true},
    status: {type:String, required:true},
    goal: {type:String, required:true},
    age: {type: String, required:true},
    weight: {type: String, required:true}
});

export const userProfModel = mongoose.model('userprof',userSchema);
