import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import classes from './App.module.css'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import Logout from './components/Logout/Logout'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/auth'


function App(props) {
  
  props.autoLogin()
  
  // определяем пути для не авторизованных пользователей
  let routes = (
    <>
      <Route index element = {<QuizList/>}/>
      <Route path = 'quiz/:id' element = {<Quiz/>}/>
      <Route path = 'auth' element = {<Auth/>}/>
    </>
  )
  
  // определяем пути для пользователей которые авторизовались
  if (props.isAuthenticated) {
    routes = (
      <>
        <Route index element = {<QuizList/>}/>
        <Route path = 'quiz/:id' element = {<Quiz/>}/>
        <Route path = 'quiz-creator' element = {<QuizCreator/>}/>
        <Route path = 'logout' element = {<Logout />}/>
      </>
    )
  }
  
  return (
    <div className = { classes.App }>
      <Routes>
        <Route path = '/' element = {<Layout/>}>
          { routes }
          <Route path = '*' element = {<QuizList/>}/>
        </Route>
      </Routes>  
      
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
