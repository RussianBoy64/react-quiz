import React from 'react'
import classes from './Select.module.css'

function Select(props) {
  const htmlFor = Math.floor(Math.random() * 100)
  
  return (
    <div className = {classes.Select}>
      <label htmlFor = {htmlFor}>{props.label}</label>
      <select 
        id = {htmlFor} 
        value = {props.value}
        onChange={props.onChange}
      >
        {props.answers.map((answer, index) => {
          return (
            <option 
              key = {index}
              value = {answer.value}
            >
              {answer.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select