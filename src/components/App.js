import 'react-piano/dist/styles.css';
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import Daily from './Daily';
import NotFound from './NotFound';
import Profile from './Profile';
import Practice from './Practice';
import Header from './Header';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);


  useEffect(() => {
    fetch("/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((r) => {
      console.log(r)
      if (r.ok) {
        r.json()
        .then((user) => {
          console.log(user)
          setUser(user)
        });
      } else {
        fetch('/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
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
    })
    .then()
  }, [localStorage.getItem("jwt")]);
  

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <hr></hr>
      <Routes>
        <Route path="/" element={<Daily user={user} streak={streak} setStreak={setStreak}/>} />
        <Route path="/practice" element={<Practice user={user} setUser={setUser} streak={streak} setStreak={setStreak}/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} streak={streak} setStreak={setStreak}/>} />
      </Routes>
    </div>
  );
}

export default App;
