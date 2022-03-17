import React, { useState, useEffect } from "react"
import classes from "./QuizList.module.css"
import { NavLink } from "react-router-dom"
import axios from "../../axios/axios"
import Loader from './../../components/UI/Loader/Loader'

function QuizList() {
  const [quizList, setQuizList] = useState([])
  const [loading, setLoading] = useState(true)

  const renderQuizes = () => {
    return quizList.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  useEffect(async() => {
    try {
      const response = await axios.get(
        "/quizes.json"
      )

      const quizes = []

      Object.keys(response.data).forEach((id, index) => {
        quizes.push({
          id: id,
          name: `Тест №${index + 1}`
        })
      })

      setQuizList(quizes)
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список</h1>

        {loading ? <Loader/> : <ul>{renderQuizes()}</ul>}
        
      </div>
    </div>
  );
}

export default QuizList
