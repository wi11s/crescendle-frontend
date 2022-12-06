import React, {useState, useEffect} from 'react'

export default function Login({user, setUser, streak, setStreak}) {
  const [switcher, setSwitcher] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [id, setId] = useState(null)
  console.log(user)

  useEffect(() => {
    if (!!user && !!user.streak) {
      setId(user.id)
    }
  }, [user])


  function handleLogin(e) {
    e.preventDefault()
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email,
        password: password
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.user) {
        localStorage.setItem("jwt", data.token);
        setUser(data);
      } else {
        alert(data.message)
      }
    })
  }

  function handleRegister(e) {
    e.preventDefault()
    console.log(email, name, password, passwordConfirmation)
    console.log(streak)

    if (password !== passwordConfirmation) {
      alert('passwords do not match')
      return
    }

    fetch(`/users_with_data/${streak}/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
        password_confirmation: passwordConfirmation
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.user) {
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt", data.token);
        setUser(data);
      } else {
        alert(data.message)
      }
    })
  }

  return (
    <div className="form">

      {switcher ? (
        <form onSubmit={handleLogin} className='login'>
          <input className='text-input' type='text' placeholder='email' onChange={e => setEmail(e.target.value)}></input>
          <input className='text-input' type='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
          <input className='submit' type='submit' value='SUBMIT'></input>
        </form>
      ) : (
        <form onSubmit={handleRegister} className='signup'>
          <input className='text-input' type='text' placeholder='email' onChange={e => setEmail(e.target.value)}></input>
          <input className='text-input' type='text' placeholder='name' onChange={e => setName(e.target.value)}></input>
          <input className='text-input' type='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
          <input className='text-input' type='password' placeholder='confirm password' onChange={e => setPasswordConfirmation(e.target.value)}></input>
          <input className='submit' type='submit' value='SUBMIT' style={password===passwordConfirmation ? {color: 'green'} : {color: 'red'} }></input>
        </form>
      )}
        {switcher ? <p className='message'>don't have an account?</p> : <p className='message'>already have an account?</p>}
        <div onClick={() => setSwitcher(!switcher)} className="btn switcher">
          <a><span>{switcher ? 'REGISTER' : 'LOG IN'}</span></a>
        </div>

    </div>
  )
}
