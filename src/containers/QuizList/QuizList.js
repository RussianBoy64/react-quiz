import React from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'

function QuizList() {
  
  const renderQuizes = () => {
    return [1, 2, 3].map((quiz,index) => {
      return (
        <li key = {index}>
          <NavLink
          to = {'/quiz/' + quiz}
          >
            {`Тест ${quiz}`}
          </NavLink>
        </li>
      )
    })
  }
  
  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список</h1>
          
        <ul>
          {renderQuizes()}
        </ul>
      </div>
    </div>
  )
}

export default QuizList