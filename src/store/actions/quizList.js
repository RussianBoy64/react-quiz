import { 
  FETCH_QUIZ_START, 
  FETCH_QUIZ_ERROR,
  FETCH_QUIZLIST_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  SET_QUIZ_RESULT,
  SET_FINISH_QUIZ,
  SET_ACTIVE_QUESTION,
  RETRY_HANDLER,
} from "./actionsTypes"
import axios from "../../axios/axios"

export function fetchQuizList() {
  return async dispatch => {
    dispatch(fetchQuizStart())
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

      dispatch(fetchQuizListSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const loadQuiz = response.data
      
      dispatch(fetchQuizSuccess(loadQuiz))
    } catch (e) {
      dispatch(fetchQuizError(e))
    }
  }
}

export function onAnswerClickHandler(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz

    // получаем текущий вопрос
    const question = state.quiz[state.activeQuestion] 

    // проверяем правильный ли он
    if (question.rightAnswerId === answerId) {
      if (!state.result[state.activeQuestion]) {
        // записываем результат
        state.result[state.activeQuestion] = 'success'
        dispatch(setQuizResult(state.result, { [answerId]: 'success' }))
      }
      
      // переходим на следующий вопрос
      const timeout = setTimeout(() => {
        
        if (isQuizFinished(state.activeQuestion, state.quiz.length)) {
          dispatch(setFinishQuiz())
        } else {
          state.activeQuestion += 1
          dispatch(setActiveQuestion(state.activeQuestion))
        }
        clearTimeout(timeout)
      }, 1000)

    } else {
      // подсвечиваем красным
      // перерендериваем компонент
      // записываем результат
      state.result[state.activeQuestion] = 'error'
      dispatch(setQuizResult(state.result, { [answerId]: 'error' }))
    }
  }
}

export function retryHandler() {
  return dispatch => {
    dispatch(rentyQuizHandler())
  }
}

//General actionCreators
function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START
  }
}

function fetchQuizError(e) {
  return {
    type: FETCH_QUIZ_ERROR,
    error: e
  }
}

//QuizList actionCreators
function fetchQuizListSuccess(quizes) {
  return {
    type: FETCH_QUIZLIST_SUCCESS,
    quizList: quizes
  }
}

//Quiz actionCreators
function fetchQuizSuccess(loadQuiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz: loadQuiz
  }
}

function setQuizResult(result, answerState) {
  return {
    type: SET_QUIZ_RESULT,
    result,
    answerState
  }
}

function setFinishQuiz() {
  return {
    type: SET_FINISH_QUIZ
  }
}

function setActiveQuestion(activeQuestion) {
  return {
    type: SET_ACTIVE_QUESTION,
    activeQuestion
  }
}

function rentyQuizHandler() {
  return {
    type: RETRY_HANDLER
  }
}

function isQuizFinished(activeQuestion, length) {
  return activeQuestion + 1 === length
}

