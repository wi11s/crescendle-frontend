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

  return (
    <nav className="navbar">
        <a className="navbar-brand" href="#">Crescendle</a>

        <Link className='nav-item' to="/">
            <h6 className="nav-item-text">Home</h6>  
        </Link>

        <Link className='nav-item' to="/practice">
            <h6 className="nav-item-text">Practice</h6>  
        </Link>

        <Link className='nav-item' to="/profile">
            <h6 className="nav-item-text">Profile</h6>  
        </Link>
    </nav>
  )
}
