import { LOG_IN, AUTO_LOG_OUT } from '../actions/actionsTypes'
import axios from 'axios'

export function onAuth(email, password, isLogin) {
  return async dispatch => {
    const userData = {
      email,
      password,
      returnSecureToken: true
    }
    
    // cохраняем адрес для регистрации
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN0CO7qPr7AjDk25UEc0PiaSO-GOnx2Z0'

    // если isLogin = true сохраняем адрес для входа
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN0CO7qPr7AjDk25UEc0PiaSO-GOnx2Z0'
    }

    try {
      // получаем ответ с сервера
      const response = await axios.post(url, userData)
      const data = response.data
      
      // устанавлием время окончания сессии (текущий таймштамп + 1 час)
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      // сохраняем данные о сессии в LocalStorage
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expiresIn', expirationDate)

      // начинаем сессию
      dispatch(login(data.idToken))
      // заканчиваем сессию
      dispatch(autoLogout(data.expiresIn))
    } catch (e) {
      console.log(e)
    }
  }
}

// сохраняем в Store token
function login(token) {
  return {
    type: LOG_IN,
    token
  }
}

// удаляем из Store idToken
function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000) //cтавим таймаут на 1 час для выходы из сессии
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expiresIn')
  return {
    type: AUTO_LOG_OUT
  }
}

export function autoLogin() {
  return dispatch => {
    // получаем токен из LocalStorage
    const token = localStorage.getItem('token')
    // если токена нет выходим из сессии
    if (!token) {
      dispatch(logout())
    } else {
      // получаем конечную дату токена
      const expirationDate = new Date(localStorage.getItem('expiresIn')) // оборачиваем в new Date() чтобы получить таймштамп
      // проверяем не просрочился ли токен
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(login(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}