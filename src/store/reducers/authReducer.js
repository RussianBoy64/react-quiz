import { LOG_IN, AUTO_LOG_OUT } from '../actions/actionsTypes'

const initialState = {
  token: null
} 

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state, token: action.token
      }
    case AUTO_LOG_OUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}