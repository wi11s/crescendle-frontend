import React, {useState} from 'react'
import { MidiNumbers } from 'react-piano';


export default function Exercise({setTodaysAbc, exercise, setSelectedId, selectedId, setFirstNote, setLastNote, setShowMessage}) {
  let key = exercise.name[0]
  const [selected, setSelected] = useState(false)

  let abc = `X:1\nM:4/4\nQ:100\nK:${key}\n|: ${exercise.first}| ${exercise.second}| ${exercise.third}|`

  function handleClick() {
    console.log(exercise)
    setTodaysAbc(abc)
    setSelected(!selected)
    setSelectedId(exercise.id)
    setFirstNote(MidiNumbers.fromNote(exercise.first_note))
    setLastNote(MidiNumbers.fromNote(exercise.last_note))
    setShowMessage(false)
  }

  return (
    <div id={exercise.id === selectedId ? 'selected-scale' : 'unselected-scale' } className='exercise' onClick={handleClick}>{exercise.name}</div>
  )
}
