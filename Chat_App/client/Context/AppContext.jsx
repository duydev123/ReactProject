import React from 'react'
import { AppContext, SocketContext, UserContext } from './ContextContainer'
import { useContext } from 'react'

export const AppProvider = ({children}) => {


    const { logout_user } = useContext(UserContext);
    const { socket } = useContext(SocketContext);

    const logout = async () => {
        if(socket){
            socket.disconnect();
        }
        await logout_user();
    }

    const value ={
        logout,
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}