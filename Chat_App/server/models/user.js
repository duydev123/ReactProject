import mongoose, { Schema } from "mongoose";

    const userSchema = new mongoose.Schema({
        username: {type:String, },
        email: {type: String, unique: true},
        pass: {type: String, required:true}
    })
    export const User = mongoose.model("User", userSchema);