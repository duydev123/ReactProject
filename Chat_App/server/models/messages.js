import mongoose from "mongoose";

const messages = new mongoose.Schema({
    senderid: {type:String, required: true},
    receiverid: {type:String , required: true},
    text : {type:String},
},{timestamps: true}); 

export const Message = mongoose.model("Message", messages);