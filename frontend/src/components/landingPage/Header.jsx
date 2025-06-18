import React from 'react'
import "../../style/header.css"
import {Link} from "react-router-dom"

function Header() {
  return (
    <nav className='header-main'>
        <section className='header-title'>YUTUB<span>2.0 - under-development</span></section>
        <section className='header-list'>
            <ul className='header-list-ul'>
                <li><a href="#home" className='header-list-ul-li'>Explore</a></li>
                <li><a href="#services" className='header-list-ul-li'>Services</a></li>
                <li><a href="#about" className='header-list-ul-li'>About</a></li>
            </ul>
        </section>
        <section className='header-auth'>
            <Link to={"/auth/login"}  className='header-auth-login'>Login</Link>
            <Link to={"/auth/signup"} className='header-auth-signup'>Join us</Link>
        </section>
    </nav>
  )
}

export default Header