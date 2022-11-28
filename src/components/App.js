import '../App.css';
import 'react-piano/dist/styles.css';
import { Routes, Route } from 'react-router-dom';
import Daily from './Daily';
import NotFound from './NotFound';
import Profile from './Profile';
import Practice from './Practice';
import Header from './Header';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

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
        .then((user) => setUser(user));
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
      <Header />
      <Routes>
        <Route path="/" element={<Daily/>} />
        <Route path="/practice" element={<Practice/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
