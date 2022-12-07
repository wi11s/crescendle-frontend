import React, { useState, useEffect } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import Soundfont from 'soundfont-player';
import 'react-piano/dist/styles.css';
import Login from './Login';
import Exercise from './Exercise';

import stringSimilarity from 'string-similarity';

import abcjs from 'abcjs';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


function Practice({user, setUser, streak, setStreak}) {
  // console.log(user)

  const [midiToNotes, setMidiToNotes] = useState({});
  const [note, setNote] = useState('');

  const [key, setKey] = useState('C');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [firstMeasure, setFirstMeasure] = useState('');
  const [secondMeasure, setSecondMeasure] = useState('');
  const [thirdMeasure, setThirdMeasure] = useState('');
  const [noteType, setNoteType] = useState('2');
  const [tempoInMs, setTempoInMs] = useState(0);
  const [bpm, setBpm] = useState(100);
  const [accuracy, setAccuracy] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [todaysAbc, setTodaysAbc] = useState('');
  const [completedScaleCount, setCompletedScaleCount] = useState(0);

  const [showMessage, setShowMessage] = useState(false);

  const [firstNote, setFirstNote] = useState(MidiNumbers.fromNote('c4'));
  const [lastNote, setLastNote] = useState(MidiNumbers.fromNote('f5'));

  const [selectedId, setSelectedId] = useState(null);
  const [selectedTab, setSelectedTab] = useState(true);

  const [space, setSpace] = useState(0);

  let abc = `X:1\nM:${timeSignature}\nQ:${bpm}\nK:${key}\n|: ${firstMeasure}| ${secondMeasure}| ${thirdMeasure}|`

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
      78: '^f',
      79: 'g',
      80: '^g',
      81: 'a',
      82: '^a',
      83: 'b'
    })
    // console.log(midiToNotes)
    fetch('/practices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setExercises(data)
    })

  }, [user])

  // keyboard

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });


  if (user===null || !(user.name)) {
    return <Login user={user} setUser={setUser} streak={streak} setStreak={setStreak}/>
  }

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
    let onThird = false
    // let onFourth = false

    // console.log(space)
    // complete


    if (space>=0 && space<3.5) {
      setNoteType('')
    } else if (space>=3.5 && space<4) {
      setNoteType('2')
    } else if (space>=4 && space<7.5) {
      setNoteType('')
    } else {
      setNoteType('2')
    }

    if (spaceForUse <= 4) {
      onFirst = true
    } else if (spaceForUse <= 8) {
      onFirst = false
      onSecond = true
      remainingSpace = 8 - spaceForUse
    } else if (spaceForUse <= 12) {
      onFirst = false
      onSecond = false
      onThird = true
      remainingSpace = 12 - spaceForUse
    }

    // console.log(midiNumber, midiToNotes[midiNumber], midiToNotes)

    if (moveForward) {
      if ((Number.isInteger(space) && (space%2)==0) || (Number.isInteger(space) && noteType==='/')) {
        if (onFirst) {
          let updatedMeasure = `${firstMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setFirstMeasure(updatedMeasure);
        } else if (onSecond) {
          let updatedMeasure = `${secondMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setSecondMeasure(updatedMeasure);
        } else if (onThird) {
          let updatedMeasure = `${thirdMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setThirdMeasure(updatedMeasure);
        }
      } else {
        if (onFirst) {
          let updatedMeasure = `${firstMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setFirstMeasure(updatedMeasure);
        } else if (onSecond) {
          let updatedMeasure = `${secondMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setSecondMeasure(updatedMeasure);
        } else if (onThird) {
          let updatedMeasure = `${thirdMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setThirdMeasure(updatedMeasure);
        }
      }
    }

    console.log(midiToNotes[midiNumber])

    if (space >= 8) {
      setFirstMeasure(``)
      setSecondMeasure('')
      setThirdMeasure('')
      setSpace(0)
      let compare = abc.slice(20, abc.length-1).replace(/\s+/g, '')+midiToNotes[midiNumber]+'2|'
      console.log(compare, todaysAbc.slice(20).replace(/\s+/g, ''))

      let newAccuracy = stringSimilarity.compareTwoStrings(compare, todaysAbc.slice(20).replace(/\s+/g, ''))
      // console.log(abc.slice(20).replace(/\s+/g, '')===todaysAbc)
      newAccuracy = parseFloat(String(newAccuracy).slice(0, 4))
      setAccuracy(newAccuracy)

      if (newAccuracy === 1) {
        setCompletedScaleCount(completedScaleCount => completedScaleCount + 1)
        setShowMessage(true)
      }
      
      onFirst = true
      return
    }
  }

  const visualObj = abcjs.renderAbc(
    "practice-paper", 
    abc
  );
  const synth = new abcjs.synth.CreateSynth();

  function calculateTempo() {
    setTempoInMs(240000/bpm)
  }

  let running;
  const targetObj = abcjs.renderAbc(
    "paper2", 
    todaysAbc
  );

  function playTarget() {
    // let newNumberOfPlays = numberOfPlays + 1
    // setNumberOfPlays(newNumberOfPlays)

    // if (numberOfPlays === 0) {
    //   fetch(`/song_plays/${user.id}/${song.id}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    //     },
    //     body: JSON.stringify({
    //       song_id: song.id,
    //       user_id: user.id,
    //       number_of_plays: 1,
    //       completed: 0
    //     })
    //   })
    // } else {
    //   fetch(`/song_plays/${user.id}/${song.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    //     },
    //     body: JSON.stringify({
    //       song_id: song.id,
    //       user_id: user.id,
    //       number_of_plays: newNumberOfPlays
    //     })
    //   })
    // }

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
    // console.log(synth.isRunning)
  }


  return (
    <div className="practice">
      <div className='scale-btn'></div>
      <div className='interval-btn'></div>
      <div className='scales'>
        {showMessage ? <p>Great job!</p> : null}
        <p id="select-message">SELECT A SCALE:</p>
        <div className='options'>
          {
              exercises.map(exercise => {
                // console.log(exercise)
                return <Exercise key={exercise.id} setTodaysAbc={setTodaysAbc} exercise={exercise} setSelectedId={setSelectedId} selectedId={selectedId} setFirstNote={setFirstNote} setLastNote={setLastNote} setShowMessage={setShowMessage}/>
              })
          }
        </div>

        <div onClick={playTarget} className="btn practice-target">
          <a><span>LISTEN</span></a>
        </div>

        <div id="practice-paper"></div>
        
        <Piano
          className="react-piano practice-piano"
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
          width={650}
          keyboardShortcuts={keyboardShortcuts}
        />
        {/* <p>accuracy: {accuracy}, number of scales completed: {completedScaleCount}</p> */}
        
      </div>
      <div id="paper2">Hidden</div>
    </div>
  );
}

export default Practice;