import React from 'react'
import HomePage from './Pages/HomePage'
import {Route} from "react-router-dom"
import ChatPage from './Pages/ChatPage'
const App = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/chat" component={ChatPage}/>
    </div>
  )
}

export default App
