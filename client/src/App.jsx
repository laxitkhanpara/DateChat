import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/chatContext'

function App() {

  const { user } = useContext(AuthContext)
  console.log("User in App:", user);
  return (

    <ChatContextProvider user={user}>
      <Routes>
        <Route path='/' element={user ? <Chat /> : <Login />} />
        <Route path='/register' element={user ? <Chat /> : <Register />} />
        <Route path='/login' element={user ? <Chat /> : <Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ChatContextProvider>

  )
}

export default App
