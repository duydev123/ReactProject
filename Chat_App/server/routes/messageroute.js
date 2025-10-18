import { Router } from "express";
import { getAllmessage } from "../controllers/messagecontroller.js";

export const messageRoute = Router();


messageRoute.get("/messages" , (req,res) => {
    getAllmessage(req,res);
})