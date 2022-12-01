import React from 'react'
import Abcjs from './Abcjs'

export default function Stats({abc}) {
  return (
    <div>
        <h2>Well Done!</h2>
        <Abcjs
            abcNotation={
                abc
            }
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
        />
        <div className="stats">
            <h2 className='stats-h2'>DAILYSTATS</h2>
            <hr className='stats-hr'></hr>
            <h3 className='stats-h3'>... people have solved today's Crescendle</h3>
            <h3 className='stats-h3'>Streak:</h3>
            <h3 className='stats-h3'>Mean:</h3>
            <h3 className='stats-h3'>Median:</h3>
        </div>
    </div>
  )
}
