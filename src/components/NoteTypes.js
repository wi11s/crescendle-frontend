import React, { useState } from 'react'

export default function NoteTypes({setNoteType}) {
    const [isSelected, setIsSelected] = useState('quarter');

    // quarterNote '2'
    // sixteenthNote '/'

    function handleQuarterClick() {
        setNoteType('2')
        setIsSelected('quarter')
    }

    function handleEighthClick() {
        setNoteType('')
        setIsSelected('eighth')
    }

    function handleSixteenthClick() {
        setNoteType('/')
        setIsSelected('sixteenth')
    }


  return (
    <div className='noteTypes'>
        <button id="quarterNote" onClick={handleQuarterClick} className={isSelected==='quarter' ? 'btnSelected btn' : 'btnUnselected btn'}>♩</button>
        <button id="eighthNote" onClick={handleEighthClick} className={isSelected==='eighth' ? 'btnSelected btn' : 'btnUnselected btn'}>♫</button>
        <button id="sixteenthNote" onClick={handleSixteenthClick} className={isSelected==='sixteenth' ? 'btnSelected btn' : 'btnUnselected btn'}>♬</button>
    </div>
  )
}
