import React, { useEffect, useState } from 'react'
import Abcjs from './Abcjs'

export default function Stats({abc, fullDate, numberOfPlays, guesses, streak}) {
  const [solvedCount, setSolvedCount] = useState(0)
  const [mean, setMean] = useState(0)
  const [median, setMedian] = useState(0)

  useEffect(() => {
    fetch(`/stats/${fullDate}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      setSolvedCount(data['number_of_completes'])
      setMean(data['mean_plays'])
      setMedian(data['median_plays'])
    })
  }, [])

  return (
    <div className='stats-outer-div'>
        <h2>{numberOfPlays===1 && guesses === 1 ? `Well Done! You solved today's Crescendle in ${guesses} guess and with ${numberOfPlays} listen`: `Well Done! You solved today's Crescendle in ${guesses} guesses and with ${numberOfPlays} listens`}</h2>
        <Abcjs
            abcNotation={
                abc
            }
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
        />
        <div className="stats">
            <h2 className='stats-h2'>DAILY STATS</h2>
            <hr className='stats-hr'></hr>
            <h3 className='stats-h3'>{parseInt(solvedCount)===1 ? "1 person has solved today's Crescendle": `${solvedCount} people have solved today's Crescendle`}</h3>
            <h3 className='stats-h3'>Streak: {streak}</h3>
            <h3 className='stats-h3'>Mean listens: {mean.toString().slice(0, 4)}</h3>
            <h3 className='stats-h3'>Median listens: {median.toString().slice(0, 4)}</h3>
        </div>
    </div>
  )
}
