import React from 'react'
import { Route, Routes } from "react-router-dom";
import classes from './App.module.css'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'


function App() {
  return (
    <div className = { classes.App }>
      <Routes>
        <Route path = '/' element = {<Layout/>}>
          <Route index element = {<QuizList/>}/>
          <Route path = 'auth' element = {<Auth/>}/>
          <Route path = 'quiz-creator' element = {<QuizCreator/>}/>
          <Route path = 'quiz/:id' element = {<Quiz />}/>
        </Route>
      </Routes>  
      
    </div>
  );
}

export default App;
