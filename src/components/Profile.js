import React from 'react'
import Login from './Login';


export default function Profile({user}) {

  if (!user.username) {
    return <Login/>
  }
  return (
    <div>Profile</div>
  )
}
