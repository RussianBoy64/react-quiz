import React from 'react'
import classes from './FinishedQuiz.module.css'

function FinishedQuiz(props) {
  return (
    <div className = { classes.FinishedQuiz }>
      <ul>
        <li>
          <strong>2. </strong>
          How are you?
          <i class = {"fa-solid fa-xmark " + classes.error} />
        </li>
        <li>
          <strong>2. </strong>
          How are you?
          <i className = {"fa-solid fa-check " + classes.success} />
        </li>
      </ul>

      <p>Правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz