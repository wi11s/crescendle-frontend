import React, { useState, useEffect } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import NoteTypes from './NoteTypes';
import PreviousGuesses from './PreviousGuesses';
import Soundfont from 'soundfont-player';
import stringSimilarity from 'string-similarity';
import { useNavigate } from 'react-router-dom';

// import Abcjs from './Abcjs';

import abcjs from 'abcjs';

function Daily({ user }) {
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
  const [visualNote, setVisualNote] = useState({});
  const [accuracy, setAccuracy] = useState(null);

  const [complete, setComplete] = useState(false);
  const [space, setSpace] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [todaysAbc, setTodaysAbc] = useState('');
  const [song, setSong] = useState({});
  
  useEffect(() => {
    if (user) {
      setGuesses(user.guesses);
    }
  }, [user])

  // get daily challenge

  useEffect(() => {
    if (user) {
      fetch(`/daily/${date.getMonth()+1}${date.getDate()}${date.getFullYear()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.id)
        setTodaysAbc(data.abc_notation.slice(37).replace(/\s+/g, ''))
        setSong(data)
        // console.log(data.abc_notation[39])
        setFirstMeasure(`${data.abc_notation[39]}2`)
      })
    }
  }, [user])
  
  // console.log(`${date.getMonth()+1}${date.getDate()}${date.getFullYear()}`)

  // put together abc notation

  let abc = `X:1\nT:Daily\nM:${timeSignature}\nQ:${bpm}\nK:${key}\n|: ${firstMeasure}| ${secondMeasure}| ${thirdMeasure}|`

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

    // let lastNote;

    // document.querySelectorAll('path').forEach((path) => {
    //   if (path.className.baseVal === 'abcjs-stem') {
    //     // path.parentElement.className = 
        
    //     // console.log(typeof path.parentElement)
    //     // setVisualNotes(path.parentElement)
    //     // path.parentElement.id = ''
    //     lastNote = path.parentElement
    //   }
    // })

    // lastNote.id = `midi${midiNumber}`
    // console.log(lastNote.parentElement)

  }

  // audio
  //      play user tune

  const synth = new abcjs.synth.CreateSynth();

  const visualObj = abcjs.renderAbc(
    "paper", 
    abc, 
    { dragging: true, 
      clickListener: function (ev) {
        // dragging function
        console.log(ev)
      }
    }
  );

  function calculateTempo() {
    setTempoInMs(240000/bpm)
  }
  
  let running;
  function play() {
    calculateTempo()
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
    })
    .catch(function (reason) {
      console.log(reason)
    });
  }

  function stop() {
    synth.stop()
  }

  //     play target tune

const targetObj = abcjs.renderAbc(
    "paper2", 
    todaysAbc, 
    { dragging: true, 
      clickListener: function (ev) {
        // dragging function
        console.log(ev)
      }
    }
  );
  
  function playTarget() {
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
    })
    .catch(function (reason) {
      console.log(reason)
    });
  }

  // console.log(document.querySelector('#midi60'))

  // guess

  function handleGuess() {
    console.log(space)
    if (space >= 8) {
      // let todaysAbc = '|:G2cc dedB|dedB dedB|c8|'.replace(/\s+/g, '')
      let newAccuracy = stringSimilarity.compareTwoStrings(abc.slice(28).replace(/\s+/g, ''), todaysAbc)
      console.log(abc.slice(28).replace(/\s+/g, ''), todaysAbc)
      newAccuracy = parseFloat(String(newAccuracy).slice(0, 4))
      setAccuracy(newAccuracy)

      console.log('song_id:', song.id)
  
      fetch('/guesses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          accuracy: newAccuracy,
          user_id: user.id,
          abc: abc.slice(28),
          song_id: song.id
        })
      })
      .then(res => res.json())
      .then(data => {
        let newGuesses = [...guesses, data]
        setGuesses(newGuesses)
        console.log(data)
      })
      .catch(err => console.log(err))
  
      if (accuracy === 1) {
        setComplete(true)
      }
    } else {
      alert('You need to finish the song before you can guess!')
    }
  }

  // hint

  function handleHint() {
  }

  if (complete) {
    return (
      <div>
        <h1>Complete!</h1>
      </div>
    )
  }

  return (
    <div className="daily">
      <button onClick={play}>Start</button>
      <button onClick={stop}>Stop</button>

      <div id="paper"></div>
      <div id="paper2"></div>
      <button onClick={() => {
        setFirstMeasure(`${todaysAbc[2]}2`)
        setSecondMeasure('')
        setSpace(1)
      }}>reset</button>
      <button onClick={playTarget}>play target</button>
      <button onClick={handleGuess}>guess</button>
      <button onClick={handleHint}>hint</button>
      <h3>accuracy: {accuracy}</h3>

      <NoteTypes setNoteType={setNoteType}></NoteTypes>
      
      <Piano
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
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />

      <PreviousGuesses user={user} guesses={guesses}/>
    </div>
  );
}

export default Daily;