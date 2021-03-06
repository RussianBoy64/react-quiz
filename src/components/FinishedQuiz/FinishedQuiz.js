import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

function FinishedQuiz({ result, quiz, retry }) {
  
  const successCount = Object.keys(result).reduce((total, key) => {
    if (result[key] === 'success') {
      total++
    }
    return total
  }, 0)
  
  return (
    <div className = { classes.FinishedQuiz }>
      <ul>
        { quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            result[index] === 'error' ? 'fa-xmark' : 'fa-check',
            classes[result[index]]
          ]

          return (
            <li key={ index }>
              { quizItem.question }
              <i className = { cls.join(' ') } />
            </li>
          )
        }) }
      </ul>

      <p>Правильно { successCount } из { quiz.length }</p>
      <div>
        <Button type = 'primary' onClick = {() => retry()}>
          Повторить
        </Button>
        <Link to = '/'>
          <Button type = 'success'>
            Перейти к списку тестов
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz