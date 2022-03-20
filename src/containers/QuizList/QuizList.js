import React, { useEffect } from "react"
import classes from "./QuizList.module.css"
import { NavLink } from "react-router-dom"
import Loader from './../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizList } from '../../store/actions/quizList'

function QuizList(props) {

  const renderQuizes = () => {
    return props.quizList.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  useEffect(() => {
    props.fetchQuizList()
  }, [])

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список</h1>
        {
          props.loading && props.quizList.length !== 0 
            ? <Loader/> 
            : <ul>{renderQuizes()}</ul>
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    quizList: state.quiz.quizList,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizList: () => dispatch(fetchQuizList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
