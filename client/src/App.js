import React from 'react'
import HomePage from './Pages/HomePage'
import {
  Route,
  Routes,
} from "react-router-dom";
import ChatPage from './Pages/ChatPage'
const App = () => {
  return (
    <div className='homepage'>
        <Routes>
          <Route path="/" element = { <HomePage/>}/>
          <Route path="/chats" element ={<ChatPage/>} />
        </Routes>
    </div>
  )
}

export default App
