

import { useState } from "react";
import { UserContext } from "./ContextContainer";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";



const backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend_url;


export const UserProvider = ({children}) =>{
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [id, setId] = useState("");
    const [receiverid, setReceiverid] = useState("");
    const [receiveruser, setReceiverUser] = useState('');
    const [message, setMessage] = useState([]);

    const receiverRef = useRef("");


    const SetReceiId = async (id,  user) => {
        setReceiverid(id);
        setReceiverUser(user);
        receiverRef.current = id;
    }
    // 
    const signin = async (_data) =>{
            const {data} = await axios.post("/auth/signin", _data);
            if(data.success){
                toast.success(data.message);
                setAuth(true);
                setToken(data.token);
                setUser(data.username);
                setId(data.id);
                localStorage.setItem("token", data.token);
            }
            else toast.error(data.message);
    }
    const signup = async (_data) =>{
        const {data} = await axios.post("/auth/signup", _data);
        if(data.success){
            toast.success(data.message);
            setAuth(true);
            setToken(data.token);
            setUser(data.username);
            setId(data.id);
            localStorage.setItem("token", data.token);
        }
        else toast.error(data.message);
    }
    
    const logout_user = async () =>{
        toast.success("Logout successfully!");
        setUser("");
        setId("");
        setReceiverid("");
        setReceiverUser("");
        setMessage([]);
        localStorage.removeItem("token");
        setAuth(false);
    }

    const getMessage = async (targetid) => {
        console.log(receiverid);
        const {data} = await axios("/mess/messages", {params:{
            sender: id, receiver: targetid,
        }});
        console.log(data);
        if(data.success){
            toast.success(data.log);
            setMessage(data.messages);
        }
        else{
            toast.error(data.log);
        }
    }

    const value = {
      auth,
      token,
      user,
      signin,
      signup,
      logout_user,
      id,
      receiverid,
      receiveruser,
      SetReceiId,
      getMessage,
      message,
      receiverRef,
    };

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}