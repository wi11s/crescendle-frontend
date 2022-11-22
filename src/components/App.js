import logo from '../logo.svg';
import '../App.css';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import Abcjs from './Abcjs';

function App() {

  // keyboard

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f4');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div className="App">
      <Abcjs
        abcNotation={
          'X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|'
        }
        parserParams={{}}
        engraverParams={{ responsive: 'resize' }}
        renderParams={{ viewportHorizontal: true }}
      />

      <div id="paper"></div>
      
      <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
      }}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}

    />
    </div>
  );
}

export default App;
