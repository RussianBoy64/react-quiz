import { ADD_QUIZ_QUESTION, RETRY_QUIZ } from '../actions/actionsTypes'

const initialState = {
  quiz: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUIZ_QUESTION: {
      return {
        ...state,
        quiz: [...state.quiz, action.newQuestion]
      }
    }
    case RETRY_QUIZ: {
      return {
        ...state,
        quiz: []
      }
    }
    default:
      return state
  }
}