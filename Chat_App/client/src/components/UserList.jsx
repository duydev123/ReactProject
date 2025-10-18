import React, { useContext } from 'react'
import { AppContext, SocketContext, UserContext } from '../../Context/ContextContainer'

const UserList = ({online}) => {
    const { user, id, SetReceiId, receiverid } = useContext(UserContext);
    const {logout} = useContext(AppContext);
    console.log("Online users:", online);

  return (
    <div className={`sm:flex ${receiverid === "" ? "flex": "hidden"} flex-col w-[100vw] sm:w-[20vw] h-[80vh] sm:border-r-2` }>
        <div className='flex flex-col p-4 border-b-2'>
                <p className='text-cyan-400 font-semibold text-3xl'>Quick<span className='text-red-600 mx-2'>Chat</span></p>
            <p className='py-4'>Current user: {user}</p>
            <button onClick={logout} className='bg-purple-400 text-white text-xl py-2 rounded-xl hover:bg-purple-800 hover:cursor-pointer my-4'>Logout</button>
        </div>
        { online.length > 1? <div className='flex flex-col overflow-auto'>
        {
            online.map((data) => {
                return(
                data.id !== id ? <div key={data.id} 
                onClick={() => {
                    SetReceiId(data.id, data.user);
                    
                }} 
                className='flex flex-row items-center text-2xl gap-4 p-4 hover:bg-gray-300 hover:cursor-pointer' >
                    <p>{data.user}</p>
                    <p className='text-green-700 text-xl'> online</p>
                </div> : null
                )
            })
        }
        </div> :
        <div className={`sm:flex ${receiverid === "" ? "flex": "hidden"} sm:w-[20vw] sm:h-[80vh] h-[50vh] sm:border-r-2 items-center justify-center`} >
        <p className='text-xl text-blue-700'>No one Online now !</p>
        </div> 
        }
    </div>
    
  )
}

export default UserList