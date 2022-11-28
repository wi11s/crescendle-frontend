import React, { useState, useEffect } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import NoteTypes from './NoteTypes';
import PreviousGuesses from './PreviousGuesses';
import Soundfont from 'soundfont-player';

import Abcjs from './Abcjs';
// import ABCJS from 'abcjs';

// import 'font-awesome/css/font-awesome.min.css';
// import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs';

function Daily() {

  const [midiToNotes, setMidiToNotes] = useState({});
  const [note, setNote] = useState('');

  const [key, setKey] = useState('C');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [firstMeasure, setFirstMeasure] = useState('');
  const [secondMeasure, setSecondMeasure] = useState('');
  const [thirdMeasure, setThirdMeasure] = useState('');
  const [fourthMeasure, setFourthMeasure] = useState('');
  const [noteType, setNoteType] = useState('2');
  const [tempoInMs, setTempoInMs] = useState(0);
  const [bpm, setBpm] = useState(120);

  const [space, setSpace] = useState(0);

  // put together abc notation

  let abc = `X:1\nT:Daily\nM:${timeSignature}\nQ:${bpm}\nK:${key}\n|: ${firstMeasure}| ${secondMeasure}| ${thirdMeasure}| ${fourthMeasure}|`

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

  function handlePress(midiNumber) {
    // z is rest
    // console.log(midiNumber)
    
    let spaceForUse;
    let remainingSpace;
    let moveForward = false;

    if (timeSignature === '4/4') {
      if (noteType === '2') {
        spaceForUse = space + 1;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 1); 
            moveForward = true;
          }
        }
      } else if (noteType === '') {
        spaceForUse = space + 0.5;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.5); 
            moveForward = true;
          }
        }

      } else if (noteType === '/') {
        spaceForUse = space + 0.25;

        if (spaceForUse <= 4) {
          remainingSpace = 4 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 8) {
          remainingSpace = 8 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 12) {
          remainingSpace = 12 - space;
          // console.log(remainingSpace)

          if (remainingSpace <= 4) {
            setSpace(space + 0.25); 
            moveForward = true;
          }
        } else if (spaceForUse <= 16) {
          remainingSpace = 16 - space;
          // console.log(remainingSpace)

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
    let onFourth = false

    console.log('space for use: ', spaceForUse)

    if (spaceForUse <= 4) {
      onFirst = true
    } else if (spaceForUse <= 8) {
      onFirst = false
      onSecond = true
      remainingSpace = 8 - spaceForUse
    } else if (spaceForUse <= 12) {
      onSecond = false
      onThird = true
      remainingSpace = 12 - spaceForUse
    } else if (spaceForUse <= 16) {
      onThird = false
      onFourth = true
      remainingSpace = 16 - spaceForUse
    }

    if (moveForward) {
      if (Number.isInteger(space) && (space%2)==0) {
        if (onFirst) {
          let updatedMeasure = `${firstMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setFirstMeasure(updatedMeasure);
        } else if (onSecond) {
          let updatedMeasure = `${secondMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setSecondMeasure(updatedMeasure);
        } else if (onThird) {
          let updatedMeasure = `${thirdMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setThirdMeasure(updatedMeasure);
        } else if (onFourth) {
          let updatedMeasure = `${fourthMeasure}`+` ${midiToNotes[midiNumber]}${noteType}`;
          setFourthMeasure(updatedMeasure);
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
        } else if (onFourth) {
          let updatedMeasure = `${fourthMeasure}`+`${midiToNotes[midiNumber]}${noteType}`;
          setFourthMeasure(updatedMeasure);
        }
      }
    }
  }

  // audio

  const synth = new abcjs.synth.CreateSynth();

  const visualObj = abcjs.renderAbc("paper", abc);

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
      console.log(results)
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

  console.log(abc)

  return (
    <div className="daily">
      <button onClick={play}>Start</button>
      <button onClick={stop}>Stop</button>

      <div id="paper"></div>

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

      <PreviousGuesses/>
    </div>
  );
}

export default Daily;