import React from 'react'

export default function Exercise({setTodaysAbc, exercise}) {
  let key = exercise.name[0]

  let abc = `X:1\nM:4/4\nQ:100\nK:${key}\n|: ${exercise.first}| ${exercise.second}| ${exercise.third}|`

  function handleClick() {
    console.log(exercise)
    setTodaysAbc(abc)
  }

  return (
    <div onClick={handleClick}>{exercise.name}</div>
  )
}
