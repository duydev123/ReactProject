import React, { useContext, useEffect, useRef } from 'react'
import { SocketContext, UserContext } from '../../Context/ContextContainer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft , faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Chatbox = ({message}) => {

    const { receiveruser, user , id , SetReceiId } = useContext(UserContext);
    const { SendMessage } = useContext(SocketContext);
     const [text, setText] = useState("");

     const messageUseRef = useRef(null);
     

     useEffect(() => {
        const container = messageUseRef.current;
        if(container) {
          container.scrollTop = container.scrollHeight;
        }
     }, [message]);

       const handleKeyDown = (event) => {
         if (event.key === "Enter") {
            SendMessage(text);
            setText("");
         }
       }; 


  return receiveruser != "" ? (
    <div className={`sm:flex flex-col h-[80vh] w-[100vw] sm:w-[40vw] bg-stone-100 ${receiveruser !== ""? "flex" : "hidden"}`}>
      <div className="flex flex-row h-[8vh] sm:h-[5vh] justify-between border-b-2 p-4">
        <p className="text-purple-700">{receiveruser} </p>
        <FontAwesomeIcon 
        className="hover:cursor-pointer text-pink-600" 
        icon={faArrowLeft}
        onClick={() => SetReceiId("","")} />
      </div>
      <div ref={messageUseRef} className="overflow-auto flex-col p-4 h-[68vh]">
        {message.length > 0 ? (
          message.map((data, index) => (
            <div key={index}>
              {data.senderid !== id ? (
                <div className="text-left">
                  <div className="flex flex-col items-start">
                    <p className="text-sm">{receiveruser}</p>
                    <p className="bg-blue-400 text-white text-xl px-4 py-2 rounded-lg">
                      {data.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="flex flex-col items-end">
                    <p className="text-sm">{user}</p>
                    <p className="bg-purple-400 text-white text-xl px-4 py-2 rounded-lg">
                      {data.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div> Your don't have any message with {receiveruser} !</div>
        )}
      </div>
      <div className="h-[7vh] flex flex-row justify-center items-center gap-4">
        <input
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Aa"
          className="border rounded-xl w-[80%] h-[5vh] px-4 "
        />
        <FontAwesomeIcon
          onClick={() => {
            SendMessage(text);
            setText("");
          }}
          icon={faPaperPlane}
          className="text-2xl hover:cursor-pointer text-pink-500"
        />
      </div>
    </div>
  ) : (
    <div className={`${receiveruser !== ""? "flex" : "hidden"} flex-col items-center justify-center h-[80vh] w-[100vw] sm:w-[40vw] bg-stone-100 sm:flex`}>
      <h1 className="text-2xl text-center">Choose someone to start an conversation!</h1>
    </div>
  );
}

export default Chatbox