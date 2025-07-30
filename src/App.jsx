import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {

    onAuthStateChanged(auth, async(user) => {
     try {
       if (user) {
        console.log('User is signed in')
        navigate('/')
      } else {
        console.log('User is signed out')
        navigate('/Login')
      }
     } catch (error) {
       console.error('Auth state change error:', error)
     }
    })
  },[])

  return (
    <div>
      <ToastContainer theme ='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element ={<Player />} />

      </Routes>
      
    </div>
  )
}

export default App