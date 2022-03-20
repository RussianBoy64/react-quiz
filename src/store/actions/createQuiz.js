import axios from "../../axios/axios"
import { ADD_QUIZ_QUESTION, RETRY_QUIZ } from './actionsTypes'

export function addQuizQuestion(newQuestion) {
  return {
    type: ADD_QUIZ_QUESTION,
    newQuestion
  }
}

export function createNewQuiz() {
  return async (dispatch, getState) => {
    const state = getState().create
    try {
      await axios.post('/quizes.json', state.quiz)
      dispatch(retryQuiz())
    } catch (e) {
      console.log(e)
    }
  }
}

function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}