import React, {useState, useEffect} from 'react'
import Login from './Login';
import Stats from './Stats';


export default function Profile({user, setUser, streak, setStreak}) {

  // useEffect(() => {
  //   if (!!user) {
  //     setStreak(user.streak)
  //   }
  // }, [user])

  if (!!user && !user.name) {
    return <Login user={user} setUser={setUser} streak={streak} setStreak={setStreak}/>
  }
  return (
    <div>
      <div className="stats">
        <h2 className='stats-h2'>STATS</h2>
        <hr className='stats-hr'></hr>
        {/* <h3 className='stats-h3'>{parseInt(solvedCount)===1 ? "1 person has solved today's Crescendle": `${solvedCount} people have solved today's Crescendle`}</h3> */}
        <h3 className='stats-h3'>Streak: {streak}</h3>
        {/* <h3 className='stats-h3'>Mean listens: {parseInt(mean)}</h3>
        <h3 className='stats-h3'>Median listens: {parseInt(median)}</h3> */}
      </div>
    </div>
  )
}
