import { 
  FETCH_QUIZ_START, 
  FETCH_QUIZ_ERROR,
  FETCH_QUIZLIST_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  SET_QUIZ_RESULT,
  SET_FINISH_QUIZ,
  SET_ACTIVE_QUESTION,
  RETRY_HANDLER
} from "../actions/actionsTypes"

const initialState = {
  //QuizList state
  quizList: [],
  //Quiz state
  activeQuestion: 0,
  answerState: null,
  finishedQuiz: false,
  result: {},
  quiz: null,
  //General state
  loading: false,
  error: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    //General cases
    case FETCH_QUIZ_START:
      return {
        ...state, 
        loading: true
      }
    case FETCH_QUIZ_ERROR:
      return {
        ...state, 
        error: action.error
      }
    //QuizList cases
    case FETCH_QUIZLIST_SUCCESS:
      return {
        ...state, 
        quizList: action.quizList, 
        loading: false
      }
    //Quiz cases
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, 
        quiz: action.quiz, 
        loading: false
      }
    case SET_QUIZ_RESULT:
      return {
        ...state,
        result: action.result,
        answerState: action.answerState
      }
    case SET_FINISH_QUIZ:
      return {
        ...state,
        finishedQuiz: true
      }
    case SET_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null
      }
    case RETRY_HANDLER:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        finishedQuiz: false,
        result: {}
      }
    default:
      return state
  }
}

