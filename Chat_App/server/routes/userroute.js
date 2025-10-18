import { Router } from "express"

import {signin, signup} from '../controllers/usercontroller.js'

const userrouter = Router();

userrouter.post("/signin", (req, res)  => {
    signin(req, res);
})
userrouter.post("/signup", (req, res) => {
    signup(req, res);
})

export default userrouter