import React from 'react'
import Abcjs from './Abcjs'

export default function PreviousGuesses({user, guesses}) {
  if (user) {
    // console.log(user.guesses)
    return (
      <div id="guesses-comp">
        <h2>Previous Guesses</h2>
        <h3>Total: {guesses.length}</h3>
        <div id="guesses">
          {
            guesses ? (
              guesses.map(guess => {
                return (
                  <div className='guess' key={guess.id}>
                    <Abcjs
                      abcNotation={
                        `X:1\nM:4/4\nK:C\n${guess.abc}`
                      }
                      parserParams={{}}
                      engraverParams={{ responsive: 'resize' }}
                      renderParams={{ viewportHorizontal: true }}
                    />
                    <p>Accuracy: {guess.accuracy}</p>
                  </div>
                )
              })
  
            ) : null
          }
        </div>
      </div>
    )
  }

}
