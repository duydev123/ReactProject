import { useContext, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext, UserContext } from "./ContextContainer";

const backend_url = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backend_url);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const { user, id, getMessage, receiverRef } = useContext(UserContext);

  const SocketConnect = async () => {
    const socket = io(backend_url);

    socket.emit("user-online", {
      user,
      id,
    });

    socket.on("connect", () => {
      console.log("connected to server");
      setSocket(socket);
    });
    socket.on("online-users", (userlist) => {
      setOnline(userlist);
    });
    socket.on("receiver-message" , () => {
      console.log("Get signal from sending message!");
      getMessage(receiverRef.current);
    } )


    socket.on("disconnect", () => {
      console.log("disconnect to server");
      setOnline([]);
    });
    return () => {
      socket.disconnect();
    };
  };

  const SendMessage = (content) =>{
      if(content == "") return;
        socket.emit("send-message", {
          senderid: id,
          receiverid: receiverRef.current,
          text: content,
        });
        console.log("Sending message ...");
  }
  const value = {
    SocketConnect,
    socket,
    online,
    SendMessage
  };
  return (
    <SocketContext.Provider value={value}>
        {children}
    </SocketContext.Provider>
  )
};
