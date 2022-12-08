import React, { useState, useEffect } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import NoteTypes from './NoteTypes';
import PreviousGuesses from './PreviousGuesses';
import Soundfont from 'soundfont-player';
import stringSimilarity from 'string-similarity';
import Stats from './Stats';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// import Abcjs from './Abcjs';

import abcjs from 'abcjs';

function Daily({ user, streak, setStreak }) {
  const navigate = useNavigate()
  const date = new Date();

  const [midiToNotes, setMidiToNotes] = useState({});
  const [note, setNote] = useState('');

  const [key, setKey] = useState('C');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [firstMeasure, setFirstMeasure] = useState('');
  const [secondMeasure, setSecondMeasure] = useState('');
  const [thirdMeasure, setThirdMeasure] = useState('c8');
  // const [fourthMeasure, setFourthMeasure] = useState('');
  const [noteType, setNoteType] = useState('2');
  const [tempoInMs, setTempoInMs] = useState(0);
  const [bpm, setBpm] = useState(100);
  // const [visualNote, setVisualNote] = useState({});
  const [accuracy, setAccuracy] = useState(0);

  const [complete, setComplete] = useState(false);
  const [space, setSpace] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [todaysAbc, setTodaysAbc] = useState('');
  const [song, setSong] = useState({});
  const [numberOfPlays, setNumberOfPlays] = useState(0);

  // initial load: get daily challenge and guesses and number of plays
  let month;
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth() + 1;
  }
  let day;
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = date.getDate();
  }
  let year = date.getFullYear();
  let fullDate = `${month}${day}${year}`;
  // let fullDate = '12092022'

  useEffect(() => {
    if (user) {
      setStreak(user.streak)
      fetch(`/daily/${fullDate}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((r) => r.json())
      .then(data => {
        // console.log(data.abc_notation[2])
        setTodaysAbc(data.abc_notation.replace(/\s+/g, ''))
        setSong(data)
        setFirstMeasure(`${data.abc_notation[2]}2`)
        return data
      })
      .then(data => {
        fetch(`/song_guesses/${user.id}/${data.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then((r) => r.json())
        .then(data => {
          setGuesses(data)
        })
        fetch(`/song_plays/${user.id}/${data.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then((r) => r.json())
        .then(data => {
          console.log(data)
          if (data !== null) {
            setNumberOfPlays(data['number_of_plays'])
            setComplete(data.completed)
          }
        })
      })
    }
  }, [user])
  
  // console.log(`${date.getMonth()+1}${date.getDate()}${date.getFullYear()}`)

  // put together abc notation

  let abc = `X:1\nM:${timeSignature}\nQ:${bpm}\nK:${key}\n|: ${firstMeasure}| ${secondMeasure}| ${thirdMeasure}|`

  // keyboard

  const firstNote = MidiNumbers.fromNote('c4');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  // set midiToNotes object

  useEffect(() => {
    setMidiToNotes({
      60: 'C',
      61: '^C',
      62: 'D',
      63: '^D',
      64: 'E',
      65: 'F',
      66: '^F',
      67: 'G',
      68: '^G',
      69: 'A',
      70: '^A',
      71: 'B',
      72: 'c',
      73: '^c',
      74: 'd',
      75: '^d',
      76: 'e',
      77: 'f',
    })
  }, [])

  let remainingSpace;

  // add note to staff

  function handlePress(midiNumber) {
    // z is rest
    
    let spaceForUse;
    let remainingSpace;
    let moveForward = false;

    if (timeSignature === '4/4') {
      if (noteType === '2') {
        spaceForUse = space + 1;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        }
      } else if (noteType === '') {
        spaceForUse = space + 0.5;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        }

      } else if (noteType === '/') {
        spaceForUse = space + 0.25;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        }
      }
    }

    let onFirst = false
    let onSecond = false
    // let onThird = false
    // let onFourth = false

    if (spaceForUse <= 4) {
      onFirst = true
    } else if (spaceForUse <= 8) {
      onFirst = false
      onSecond = true
      remainingSpace = 8 - spaceForUse
    }

    if (moveForward) {
      if ((Number.isInteger(space) && (space%2)==0) || (Number.isInteger(space) && noteType==='/')) {
        if (onFirst) {
          let updatedMeasure = `${firstMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setFirstMeasure(updatedMeasure);
        } else if (onSecond) {
          let updatedMeasure = `${secondMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setSecondMeasure(updatedMeasure);
        }
      } else {
        if (onFirst) {
          let updatedMeasure = `${firstMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setFirstMeasure(updatedMeasure);
        } else if (onSecond) {
          let updatedMeasure = `${secondMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setSecondMeasure(updatedMeasure);
        }
      }
    }

  }

  // audio
  //      play user tune

  const synth = new abcjs.synth.CreateSynth();
  const [playing, setPlaying] = useState(synth.isRunning);


  const visualObj = abcjs.renderAbc(
    "paper", 
    abc,
    { responsive: "resize" }
  );

  function calculateTempo() {
    setTempoInMs(240000/bpm)
  }

  useEffect(() => {
    calculateTempo()
  }, [])
  
  let running;
  function play() {
    const myContext = new AudioContext();
    running = synth.init({
      audioContext: myContext,
      visualObj: visualObj[0],
      millisecondsPerMeasure: tempoInMs,
      options: {
          soundFontUrl: "",
          pan: [ -0.3, 0.3 ] 
    }
    }).then(function (results) {
      synth.prime()
    })
    .then(() => {
      synth.start();
      // console.log(synth.isRunning)
      setPlaying(true)
    })
    .catch(function (reason) {
      console.log(reason)
    });
  }

  function stop() {
    synth.stop()
  }

  useEffect(() => {
    // console.log(synth)
    setPlaying(synth.isRunning)
  }, [synth.isRunning])

  //     play target tune

  const targetObj = abcjs.renderAbc(
    "paper2", 
    todaysAbc
  );
  
  function playTarget() {
    let newNumberOfPlays = numberOfPlays + 1
    setNumberOfPlays(newNumberOfPlays)

    if (numberOfPlays === 0) {
      fetch(`/song_plays/${user.id}/${song.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          song_id: song.id,
          user_id: user.id,
          number_of_plays: 1,
          completed: 0
        })
      })
    } else {
      fetch(`/song_plays/${user.id}/${song.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          song_id: song.id,
          user_id: user.id,
          number_of_plays: newNumberOfPlays
        })
      })
    }

    calculateTempo()
    const myContext = new AudioContext();
    running = synth.init({
      audioContext: myContext,
      visualObj: targetObj[0],
      millisecondsPerMeasure: tempoInMs,
      options: {
          soundFontUrl: "",
          pan: [ -0.3, 0.3 ] 
    }
    }).then(function (results) {
      synth.prime()
    })
    .then(() => {
      synth.start();
      setPlaying(synth.isRunning)
    })
    .catch(function (reason) {
      console.log(reason)
    });
    // console.log(synth.isRunning)
  }

  // guess
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let yesterdayMonth;
  if (date.getMonth() + 1 < 10) {
    yesterdayMonth = `0${yesterday.getMonth() + 1}`;
  } else {
    yesterdayMonth = yesterday.getMonth() + 1;
  }
  let yesterdayDay;
  if (yesterday.getDate() < 10) {
    yesterdayDay = `0${yesterday.getDate()}`;
  } else {
    yesterdayDay = yesterday.getDate();
  }
  let yesterdayYear = yesterday.getFullYear();
  let yesterdayFullDate = `${yesterdayMonth}${yesterdayDay}${yesterdayYear}`
  // let yesterdayFullDate = '12082022'

  // console.log(yesterdayFullDate)

  function handleGuess() {
    // console.log(space)
    if (space >= 8) {
      // let todaysAbc = '|:G2cc dedB|dedB dedB|c8|'.replace(/\s+/g, '')
      let newAccuracy = stringSimilarity.compareTwoStrings(abc.slice(20).replace(/\s+/g, ''), todaysAbc)
      // console.log(abc.slice(20).replace(/\s+/g, '')===todaysAbc)
      newAccuracy = parseFloat(String(newAccuracy).slice(0, 4))
      setAccuracy(newAccuracy)

      // console.log('song_id:', song.id)
  
      fetch('/guesses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          accuracy: newAccuracy,
          user_id: user.id,
          abc: abc.slice(20),
          song_id: song.id
        })
      })
      .then(res => res.json())
      .then(data => {
        let newGuesses = [...guesses, data]
        setGuesses(newGuesses)
        // console.log(data)
        if (newAccuracy === 1) {
          fetch(`/completed/${user.id}/${song.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
              completed: 1
            })
          })
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            fetch(`/streak/${user.id}/${yesterdayFullDate}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
              body: JSON.stringify({})
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              setStreak(data.streak)
            })
          })
          setComplete(true)
        }
      })
      .catch(err => console.log(err))
  


    } else {
      alert('You need to finish the song before you can guess!')
    }
  }

  if (complete) {
    return <Stats fullDate={fullDate} abc={song.abc_notation} numberOfPlays={numberOfPlays} guesses={guesses.length} streak={streak}/>
  }

  return (
    // <motion.div
    //         initial={{ opacity: 0, scale: 0.5 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{
    //           duration: 1.8,
    //           delay: 0,
    //           ease: [0, 0.71, 0.2, 1.01]
    //         }}
    //       >
    <div className="daily">
      <div className="game-ui">
        <h3>Listen to the Target, then guess the melody!</h3>
        <div className='staff-and-controllers'>

          <div className="controllers">
            
            <div className="start-stop">
              {/* {playing ? <p>is</p> : <p>is not</p>} */}
              <div onClick={play} className="btn">
                <a><span>PLAY</span></a>
              </div>
              <div onClick={() => synth.stop()} className="btn">
                <a><span>STOP</span></a>
              </div>
              <div onClick={playTarget} className="btn-2 ">
                <a><span>TARGET</span></a>
              </div>
            </div>
            <div className='reset-guess'>
              <button className="panel-btn" onClick={() => {
                setFirstMeasure(`${todaysAbc[2]}2`)
                setSecondMeasure('')
                setSpace(1)
              }}>RESET</button>
              <button className="panel-btn" id='guess-btn' onClick={handleGuess}>GUESS</button>
            </div>
          </div>
          <div id="paper"></div>

        </div>

        <div className="info">
          <h3>ACCURACY: {accuracy*100}%</h3>
          <h3>NUMBER OF LISTENS: {numberOfPlays}</h3>
        </div>

        <div className="piano">
          <NoteTypes setNoteType={setNoteType}></NoteTypes>
          <Piano
            className="react-piano"
            onPlayNoteInput={(midiNumber) => {
              handlePress(midiNumber);
            }}
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
              Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {
                piano.play(midiNumber, 0, { duration: 0.5, gain: 10 });
              })
            }}
            stopNote={(midiNumber) => {
              // Stop playing a given note - see notes below
            }}
            // width={650}
            keyboardShortcuts={keyboardShortcuts}
          />
        </div>
      </div>
      {/* <hr className='guesses-hr'></hr> */}
      <div>
          <div className='outer-previous-guesses'>
            <div className='previous-guesses'>
              <PreviousGuesses user={user} guesses={guesses}/>
            </div>
          </div>
        <div id="paper2">Hidden</div>
      </div>

    </div>
    // </motion.div>
  );
}

export default Daily;