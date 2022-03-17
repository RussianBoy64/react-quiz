import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from "../../axios/axios"
import Loader from '../../components/UI/Loader/Loader'



function Quiz(props) {
  let [activeQuestion, setActiveQuestion] = useState(0)
  let [answerState, setAnswerState] = useState(null) // {[id]: 'success' 'error' }
  let [finishedQuiz, setFinishedQuiz] = useState(false)
  let [loading, setLoading] = useState(true)
  let params = useParams()
  const [result, setResult] = useState({}) // {'success' 'error' }
  const [quiz, setQuiz] = useState([])
  
  const onAnswerClickHandler = answerId => {
    
    // получаем текущий вопрос
    const question = quiz[activeQuestion] 

    // проверяем правильный ли он
    if (question.rightAnswerId === answerId) {
      if (!result[activeQuestion]) {
        // записываем результат
        setResult({ ...result, [activeQuestion]: 'success'})
      }
      

      // подсвечиваем зеленым
      setAnswerState({ [answerId]: 'success'})
      // переходим на следующий вопрос
      const timeout = setTimeout(() => {
        
        if (isQuizFinished()) {
          setFinishedQuiz(true)
        } else {
          setActiveQuestion(activeQuestion = activeQuestion + 1)
          setAnswerState(null)
        }
        
        clearTimeout(timeout)
      }, 1000)

    } else {
      // подсвечиваем красным
      // перерендериваем компонент
      setAnswerState({ [answerId]: 'error'})
      // записываем результат
      setResult({ ...result, [activeQuestion]: 'error'})
    }
  }
  
  const isQuizFinished = () => {
    return activeQuestion + 1 === quiz.length
  }

  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setFinishedQuiz(false)
    setResult({})
  }

  useEffect(async () => {
    try {
      const response = await axios.get(`/quizes/${params.id}.json`)
      const loadQuiz = response.data
      
      setQuiz(loadQuiz)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div className = {classes.Quiz}>
        <div className = {classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>

              { loading 
                ? <Loader/>
                : finishedQuiz
                  ? <FinishedQuiz 
                      result = { result }
                      quiz = { quiz }
                      retry = { retryHandler }
                    />
                  : <ActiveQuiz 
                      answers = { quiz[activeQuestion].answers }
                      question = { quiz[activeQuestion].question }
                      onAnswerClick = { onAnswerClickHandler }
                      quizLength = { quiz.length }
                      answerNumber = { activeQuestion + 1 }
                      state = { answerState }
                    />
              }
        </div>
    </div>
  )
}

export default Quiz