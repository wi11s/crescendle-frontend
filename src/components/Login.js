import React, {useState} from 'react'

export default function Login({user, setUser}) {
  const [switcher, setSwitcher] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')


  function handleLogin() {
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
      setUser(data)
    })
  }

  function handleRegister() {

  }

  return (
    <div className="form">

      {switcher ? (
        <form onSubmit={handleLogin} className='login'>
          <input className='text-input' type='text' placeholder='email'></input>
          <input className='text-input' type='password' placeholder='password'></input>
          <input className='submit' type='submit' value='SUBMIT'></input>
        </form>
      ) : (
        <form onSubmit={handleRegister} className='signup'>
          <input className='text-input' type='text' placeholder='email'></input>
          <input className='text-input' type='password' placeholder='password'></input>
          <input className='text-input' type='password' placeholder='confirm password'></input>
          <input className='submit' type='submit' value='SUBMIT'></input>
        </form>
      )}
        {switcher ? <p className='message'>don't have an account?</p> : <p className='message'>already have an account?</p>}
        <div onClick={() => setSwitcher(!switcher)} className="btn switcher">
          <a><span>{switcher ? 'REGISTER' : 'LOG IN'}</span></a>
        </div>

    </div>
  )
}
