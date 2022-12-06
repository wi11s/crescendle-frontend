import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({user, setUser}) {
    const [switcher, setSwitcher] = useState(true)

    console.log(user)

    useEffect(() => {
        if (!!user && !!user.name) {
            setSwitcher(true)
        } else {
            setSwitcher(false)
        }
    }, [user])
    
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("jwt");
        setUser(null);
        navigate("/");
    }

    function login() {
        navigate("/profile");
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

    // function handleHomeClick() {
    //     navigate("/")
    // }

  return (
    <nav className="navbar">
        <a className="navbar-brand" href="" onClick={handleHomeClick}>CRESCENDLE</a>
        <div className="navbar-all-items">

            {/* <div onClick={handleHomeClick} className="btn-2 nav-item">
                <a><span>HOME</span></a>
            </div> */}

            <div onClick={handlePracticeClick} className="btn-2 nav-item">
                <a><span>PRACTICE</span></a>
            </div>

            <div onClick={handleProfileClick} className="btn-2 nav-item">
                <a><span>PROFILE</span></a>
            </div>
            {switcher ? (
                <div onClick={logout} className="btn-2 nav-item" id='logout'>
                    <a><span>LOG OUT</span></a>
                </div>
            ) : (
                <div onClick={login} className="btn-2 nav-item" id='login'>
                    <a><span>LOG IN</span></a>
                </div>
            )}
            

        </div>
    </nav>
  )
}
