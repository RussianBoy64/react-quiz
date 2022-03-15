import React from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI//Button/Button'
import Input from '../../components/UI/Input/Input'

function Auth() {
  
  const submitHandler = event => {
    event.preventDefault()
  }
  
  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form
        className={classes.AuthForm}
        onSubmit={submitHandler}
        >
          
          <Input type = 'text' label = 'Email'/>
          <Input type = 'text' label = 'Пароль'/>

          <Button type = 'success'>Войти</Button>
          <Button type = 'primary'>Регистрация</Button>
        </form>
      </div>
    </div>
  )
}

export default Auth