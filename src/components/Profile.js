import React, {useState, useEffect} from 'react'
import Login from './Login';


export default function Profile({user, setUser, streak, setStreak}) {
  const [meanGuesses, setMeanGuesses] = useState(0)
  const [meanListens, setMeanListens] = useState(0)
  const [goals, setGoals] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [content, setContent] = useState('')
  const [endDate, setEndDate] = useState('')
  const [complete, setComplete] = useState(true)
  const [intervalHighScore, setIntervalHighScore] = useState(0)

  useEffect(() => {
    if (user && user.name) {
      setStreak(user.streak)
      setIntervalHighScore(user.interval_high_score)

      fetch(`/user_stats/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log('mean:', data)
        setMeanListens(data)
      })
  
      fetch(`/user_guess_stats/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log('mean guesses:', data)
        setMeanGuesses(data)
      })

      fetch(`/goals/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log('goals:', data)
        setGoals(data)
      })
    }
  }, [user])

  if (!!user && !user.name) {
    return <Login user={user} setUser={setUser} streak={streak} setStreak={setStreak}/>
  }

  function handleClick() {
    setShowForm(!showForm)
  }

  function handleSubmit(e) {
    e.preventDefault()

    setShowForm(false)
    fetch(`/goals/${user.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content,
        complete_by: endDate,
        user_id: user.id,
        complete: 0
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setGoals([...goals, data])
    })
  }

  function handleContentChange(e) {
    // console.log(e.target.value)
    setContent(e.target.value)
  }

  function handleDateChange(e) {
    // console.log(e.target.value)
    setEndDate(e.target.value)
  }

  function handleCheck(e) {
    console.log(e.target.value, e.target.checked)

    if (e.target.checked) {
      fetch(`/goals/${e.target.value}/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          complete: 1
        })
      })
      .then(res => res.json())
      .then(data => {
        setGoals(data)
        console.log(data)
      })
    } else {
      fetch(`/goals/${e.target.value}/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          complete: 0
        })
      })
      .then(res => res.json())
      .then(data => {
        setGoals(data)
        console.log(data)
      })
    }
  }

  return (
    <div>
      <div className="profile-stats">
        <h2 className='stats-h2'>PERSONAL STATS</h2>
        <hr className='stats-hr'></hr>
        <h3 className='stats-h3'>Streak: {streak}</h3>
        <h3 className='stats-h3'>Mean listens: {meanListens}</h3>
        <h3 className='stats-h3'>Mean guesses: {meanGuesses}</h3>
        <h3 className='stats-h3'>Interval High Score: {intervalHighScore}</h3>
      </div>
      <div className='goals'>
        <h2 className='stats-h2'>PRACTICE GOALS</h2>
        <hr className='stats-hr'></hr>
        {showForm ? (
          <form className='goal-form' onSubmit={handleSubmit}>
            <label className='label'>Goal:</label>
            <input className='text-input' onChange={handleContentChange} type='text' name='goal' placeholder='Practice 30 minutes' />
            <label className='label'>Complete by:</label>
            <input className='text-input' onChange={handleDateChange} type='date' name='end_date' />
            <input className='submit' type='submit' value='SUBMIT' />
          </form>
        ) : (
          <div>
            {goals.map(goal => {
              console.log(goal.complete)
              return (
                <div className='goal' key={goal.id}>
                  <input type='checkbox' name='goal' value={goal.id} checked={goal.complete==1 ? true : false } onChange={handleCheck}/>
                  <h3 className='goal-h3'>{goal.content} - {goal.complete_by}</h3>
                </div>
              )
            })}
          </div>
        ) }

        {showForm ? (
          <div onClick={handleClick} className="btn" id='new'>
            <a><span>-</span></a>
          </div>
        ) : (
          <div onClick={handleClick} className="btn" id='new'>
            <a><span>+</span></a>
          </div>
        ) }
      </div>
    </div>
  )
}
