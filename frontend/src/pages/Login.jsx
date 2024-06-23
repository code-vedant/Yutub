import React from 'react'
import { useForm } from 'react-hook-form'
import "../style/login.css"
import login from "../assets/login.webm"

function Login() {
  return (
    <>
        <div className='login-main'>
            <div className='box'>
                <div className='box-left'>
                <h3>Welcome Back!!</h3>
                <video src={login} autoPlay loop muted/>
                </div>
                <div className='box-right'></div>
            
            </div>
            
        </div>
    </>
  )
}

export default Login