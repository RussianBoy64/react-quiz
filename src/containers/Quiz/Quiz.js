import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, onAnswerClickHandler, retryHandler } from '../../store/actions/quizList'

function Quiz(props) {
  let params = useParams()

  useEffect(() => {
    props.fetchQuizById(params.id)
    return () => props.retryHandler()
  }, [])

  return (
    <div className = {classes.Quiz}>
        <div className = {classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>

              { props.loading || !props.quiz
                ? <Loader/>
                : props.finishedQuiz
                  ? <FinishedQuiz 
                      result = { props.result }
                      quiz = { props.quiz }
                      retry = { props.retryHandler }
                    />
                  : <ActiveQuiz 
                      answers = { props.quiz[props.activeQuestion].answers }
                      question = { props.quiz[props.activeQuestion].question }
                      onAnswerClick = { props.onAnswerClickHandler }
                      quizLength = { props.quiz.length }
                      answerNumber = { props.activeQuestion + 1 }
                      state = { props.answerState }
                    />
              }
        </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    finishedQuiz: state.quiz.finishedQuiz,
    result: state.quiz.result,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
    onAnswerClickHandler: answerId => dispatch(onAnswerClickHandler(answerId)),
    retryHandler: () => dispatch(retryHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)