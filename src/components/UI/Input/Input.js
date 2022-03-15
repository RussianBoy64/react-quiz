import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, shouldInvalidate, touched}) {
  return !valid && shouldInvalidate && touched
}

function Input(props) {
  
  const inputType = props.type || 'text'
  const htmlFor = `${props.label}-${Math.floor(Math.random() * 100)}`
  const cls = [classes.Input]
  
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>
        {props.label}
      </label>
      <input 
        type = {inputType}
        id = {htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) && <span>{props.errorMessage}</span>}
    </div>
  )
}

export default Input