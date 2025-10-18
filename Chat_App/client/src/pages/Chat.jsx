import React, { useContext, useEffect } from 'react'
import { SocketContext, UserContext } from '../../Context/ContextContainer'
import UserList from '../components/UserList';
import Chatbox from '../components/Chatbox';

const Chat = () => {



  const {SocketConnect, online } = useContext(SocketContext);
  const { message, receiverid, getMessage } = useContext(UserContext);

  console.log(online);

useEffect(() => {
   SocketConnect();
}, []);

useEffect(() => {
  if(receiverid){
    getMessage(receiverid);
  }
}, [receiverid])





  return (
    <div className="w-screen h-screen bg-center bg-cover bg-[url('/bg.jpg')] flex justify-center items-center">
      <div className='w-[100vw] sm:w-[60vw] h-[80vh] bg-white rounded-2xl flex-row flex'>
        <UserList online={online}/>
        <Chatbox message={message}/>
      </div>
    </div>
  );
}

export default Chat