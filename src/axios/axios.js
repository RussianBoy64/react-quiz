import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-517eb-default-rtdb.firebaseio.com'
})