import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
    
    const navigate = useNavigate()

    function logout() {
    //     localStorage.removeItem("jwt");
    //     setUser(null);
    //     navigate("/");
    }

    function handleHomeClick() {
        navigate("/")
    }

    function handlePracticeClick() {
        navigate("/practice")
    }

    function handleProfileClick() {
        navigate("/profile")
    }

  return (
    <nav className="navbar">
        <a className="navbar-brand" href="" onClick={handleHomeClick}>CRESCENDLE</a>
        <div className="navbar-all-items">

            <div onClick={handlePracticeClick} className="btn-2 nav-item">
                <a><span>PRACTICE</span></a>
            </div>

            <div onClick={handleProfileClick} className="btn-2 nav-item">
                <a><span>PROFILE</span></a>
            </div>

        </div>
    </nav>
  )
}
