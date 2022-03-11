import React from 'react'
import { useState } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'



function Quiz() {
  let [activeQuestion, setActiveQuestion] = useState(0)
  let [answerState, setAnswerState] = useState(null) // {[id]: 'success' 'error' }
  let [finishedQuiz, setFinishedQuiz] = useState(true)
  const [quiz, setQuiz] = useState([
    {
      question: 'Какого цвета небо?',
      rightAnswerId: 2,
      answers: [
      {text: 'Черный', id: 1},
      {text: 'Голубой', id: 2},
      {text: 'Красный', id: 3},
      {text: 'Желтый', id: 4}
    ]},
    {
      question: 'В каком году основали Санкт-Петербург?',
      rightAnswerId: 3,
      answers: [
      {text: '1700', id: 1},
      {text: '1702', id: 2},
      {text: '1703', id: 3},
      {text: '1803', id: 4}
    ]},
  ])
  
  const onAnswerClickHandler = answerId => {
    
    // получаем текущий вопрос
    const question = quiz[activeQuestion] 

    // проверяем правильный ли он
    if (question.rightAnswerId === answerId) {

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
    }
  }
  
  const isQuizFinished = () => {
    return activeQuestion + 1 === quiz.length
  }

  return (
    <div className = {classes.Quiz}>
        <div className = {classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>

              { finishedQuiz
                  ? <FinishedQuiz 
                    
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