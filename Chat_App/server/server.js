import express from 'express';
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io';
import  dotenv from 'dotenv';
dotenv.config();

const mongo_url = process.env.MONGODB_URL;

import { MongoDBConnect } from './configs/mongoose.js';
import mongoose from 'mongoose';
import userrouter from './routes/userroute.js';
import { messageRoute } from './routes/messageroute.js';
import { Message } from './models/messages.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// middlewares
app.use(express.json());
app.use(cors());

// First send
app.get('/', (req, res) => {
  res.send("Server is running");
});

// use routes
app.use('/auth', userrouter);
app.use('/mess', messageRoute);


//MongoDb connect
MongoDBConnect({mongo_url});
mongoose.connection.on('connected', () =>{
  console.log("MongoDb connection!");
})
// contain useronline
const UserOnline = new Map();
const UserSocketMap = new Map();

// socket connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);


  socket.on("user-online", ({user, id}) => {
    UserOnline.set(socket.id, {user, id});
    UserSocketMap.set(id , socket.id);
    io.emit("online-users", Array.from(UserOnline.values()));
  });

  socket.on("send-message" , async ({ senderid, receiverid, text }) => {
    console.log("Reiceive an message !");
    // console.log(UserOnline);
    // console.log(senderid, receiverid);
    await Message.create({
      senderid,
      receiverid,
      text,
    })

    const targetSender = UserSocketMap.get(senderid);
    // console.log(targetSender);

    if(targetSender){
      console.log("Sending back message!")
      io.to(targetSender).emit("receiver-message");
    }
      const targetReiceiver = UserSocketMap.get(receiverid);
      // console.log(targetReiceiver);

    if(targetReiceiver){
      console.log("Sending back message!")
      io.to(targetReiceiver).emit("receiver-message");
    }
  })


  socket.on("disconnect", () => {


  console.log('a user disconnect', socket.id);
  UserOnline.delete(socket.id);
  io.emit("online-users", Array.from(UserOnline.values()));
})

});


// server listen
server.listen(3000, () => {
  console.log('server running at Port :3000');
});