import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import { SocketContext, UserContext } from '../Context/ContextContainer'
import { UserProvider } from '../Context/UserContext'
import Chat from './pages/Chat'
import { Toaster } from 'react-hot-toast'





const App = () => {
  const {auth} = useContext(UserContext);
  return (
    <>
    <Toaster />
        <Routes>
          <Route path="/" element={auth? <Chat /> : <Home />} />
          <Route path="/chat" element={auth?  <Chat /> : <Home /> } />
        </Routes>
    </>
  );
}

export default App