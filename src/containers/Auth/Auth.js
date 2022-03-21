import React, { useState } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI//Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import { onAuth } from '../../store/actions/auth'
import { connect } from 'react-redux'

function Auth(props) {
  let [isFromValid, setIsFromValid] = useState(false)
  const [formControles, setFormControles] = useState({
    email: {
      type: 'email',
      label: 'Email',
      value: '',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      type: 'password',
      label: 'Пароль',
      value: '',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  })

  function validateControl(value, validation) {
    let isValid = true

    if (!validation) return isValid

    if (validation.required) isValid = value.trim() !== '' && isValid

    if (validation.email) isValid = is.email(value) && isValid

    if (validation.minLength) isValid = value.length >= validation.minLength && isValid
    
    return isValid
  }

  const onChangeHandler = (event, controlName) => {

    const fControles = { ...formControles }
    const control = { ...formControles[controlName] }

    control.touched = true
    control.value = event.target.value
    control.valid = validateControl(control.value, control.validation)

    fControles[controlName] = { ...control }

    let formValid = true

    Object.keys(fControles).forEach(name => {
      formValid = fControles[name].valid && formValid
    })

    setFormControles(fControles)
    setIsFromValid(formValid)
  }
  
  const renderInputs = () => {
    return Object.keys(formControles).map((controlName, index) => {
      const control = formControles[controlName]
      
      return (
        <Input
          key = {`${controlName}-${index}`}
          type = {control.type}
          label = {control.label}
          value = {control.value}
          errorMessage = {control.errorMessage}
          valid = {control.valid}
          touched = {control.touched}
          shouldValidate = {!!control.validation}
          onChange = {event => onChangeHandler(event, controlName)}
        />
      )
    })
  }
  
  const submitHandler = event => {
    event.preventDefault()
  }

  const onSignInHandler = () => {
    props.onAuth(
      formControles.email.value,
      formControles.password.value,
      true
    )
  }
  
  const onRegisterHandler = () => {
    props.onAuth(
      formControles.email.value,
      formControles.password.value,
      false
    )
  }
  
  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form
        className={classes.AuthForm}
        onSubmit={submitHandler}
        >
          
          {renderInputs()}

          <Button 
            type = 'success'
            onClick = {onSignInHandler}
            disabled = {!isFromValid}
          >
            Войти
          </Button>
          <Button 
            type = 'primary'
            onClick = {onRegisterHandler}
            disabled = {!isFromValid}
          >
            Регистрация
          </Button>
        </form>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password, isLogin) => dispatch(onAuth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)