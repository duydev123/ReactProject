import express from 'express'
import { User } from '../models/user.js';
import { GenerateToken } from '../configs/token.js';
import validator from 'validator'
import bcrypt from 'bcryptjs'

export const signin = async (req, res) => {
    try {
        const {email, pass}  = req.body;
        if(!email &&  !pass){
            return res.json({
                success: false , message: "Please enter valid data!"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success: false , message: "Email not found!"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
        if(isPasswordCorrect){
            const token = await GenerateToken({user_id: user._id});
            return res.json({
                success: true, message: "Login successfully!", token: token, username: user.username, id : user._id
            });
        }
        else {
            return res.json({
                success: false , message: "Password is wrong!"
            });
        }

    } catch (error) {
        console.log("Signin Error: ", error.message);
        return res.json({
            success:false , message: error.message
        })
    }
}


export const signup = async (req, res) => {
    try {
        const {username, email, pass} = req.body;
        if(!validator.isEmail(email)){
            return res.json({
                success:false, message: "Email is not Valid!"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({
                success: false , message: "Email already exist!"
            })
        }
        const hashpass = await bcrypt.hash(pass, 10);
        const newUser = {
            username: username,
            email: email,
            pass: hashpass,
        }
        const CreateUser = await User.create(newUser);
        const token = await GenerateToken({user_id: CreateUser._id })
        return res.json({
            success: true, message: "Register successfully!", token: token , username: CreateUser.username, id: CreateUser._id
        })
    } catch (error) {
        console.log("Signin Error: ", error.message);
        return res.json({
            success:false , message: error.message
        })
    }
}