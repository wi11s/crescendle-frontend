import React from 'react'
import Abcjs from './Abcjs'

export default function PreviousGuesses({user, guesses}) {
  if (user) {
    // console.log(user.guesses)
    return (
      <div>
        <h2>Previous Guesses</h2>
        <h3>Total: {guesses.length}</h3>
          {
            guesses ? (
              guesses.map(guess => {
                return (
                  <div key={guess.id}>
                    <Abcjs
                      abcNotation={
                        `X:1\nM:4/4\nK:C\n${guess.abc}`
                      }
                      parserParams={{}}
                      engraverParams={{ responsive: 'resize' }}
                      renderParams={{ viewportHorizontal: true }}
                    />
                    <p>{guess.accuracy}</p>
                  </div>
                )
              })
  
            ) : null
          }
      </div>
    )
  }

}
