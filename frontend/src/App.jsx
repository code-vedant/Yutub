import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import VideoBox from './components/VideoBox'
import VideoContainer from './components/VideoContainer'
import HomePage from './pages/HomePage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <div className='app-main'>
          <Header className="header"/>
          <main className='appMain'>
            <Outlet />
          </main>
      </div>
    </>
  )
}

export default App
