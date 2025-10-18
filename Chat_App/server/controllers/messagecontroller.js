import { Message } from "../models/messages.js";



export const getAllmessage = async (req, res) => {
    try {
        const {sender, receiver} = req.query;
        console.log(receiver);
        console.log(sender, typeof(sender),  receiver, typeof(receiver));

        const messages = await Message.find({
            $or: [
                { senderid: sender , receiverid: receiver},
                { receiverid: sender , senderid: receiver},
            ],
        }).sort({ createdAt: 1});
        console.log(messages);
        res.json({messages: messages, success: true,  log: "Get all message!"});
    } catch (error) {
        console.log(error.messages);
        res.json({success: false ,log: "Can not message!"});
    }
}