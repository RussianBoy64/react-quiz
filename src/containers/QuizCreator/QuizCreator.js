import React, { useState } from "react"
import classes from "./QuizCreator.module.css"
import Button from "./../../components/UI/Button/Button"
import { createControl, controlValidate, formValidate } from "../../form/formFramework"
import Input from "../../components/UI/Input/Input"
import Select from "../../components/UI/Select/Select"

const submitHandler = event => {
  event.preventDefault()
}

function createFromControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOption(1),
    option2: createOption(2),
    option3: createOption(3),
    option4: createOption(4),
  }
}

const createOption = (number) => {
  return createControl(
    {
      label: `Вопрос ${number}`,
      errorMessage: "Введите варинт ответа",
      id: number
    },
    { required: true }
  );
};

function QuizCreator() {
  const [quiz, setQuiz] = useState([])
  let [rightAnswerId, setRightAnswerId] = useState(1)
  const [formControl, setFormControl] = useState(createFromControls())
  let [isFormValid, setIsFormValid] = useState(false)

  function renderControls() {
    return Object.keys(formControl).map((controlName, index) => {
      const control = formControl[controlName];
  
      return (
        <Input 
          key = {`${controlName}-${index}`}
          id = {control.id}
          type = {control.type}
          label = {control.label}
          value = {control.value}
          errorMessage = {control.errorMessage}
          valid = {control.valid}
          touched = {control.touched}
          shouldValidate = {!!control.validation}
          onChange = {event => onChangeHandler(event, controlName)}
        />
      );
    });
  }

  const selectChangeHandler = event => {
    setRightAnswerId(event.target.value)
  }

  const onChangeHandler = (event, controlName) => {
    
    const fControls = { ...formControl }
    const control = { ...fControls[controlName] }

    control.touched = true
    control.value = event.target.value
    control.valid = controlValidate(control.value, control.validation)

    fControls[controlName] = control

    setFormControl(fControls)
    setIsFormValid(formValidate(fControls))
  }

  const addQuestionHandler = event => {
    event.preventDefault()
  
    const quizArray = [...quiz]
    const index = quizArray.length + 1

    const newQuestion = {
      question: formControl.question.value,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: formControl.option1.value, id: formControl.option1.id},
        {text: formControl.option2.value, id: formControl.option2.id},
        {text: formControl.option3.value, id: formControl.option3.id},
        {text: formControl.option4.value, id: formControl.option4.id},
      ]
    }

    quizArray.push(newQuestion)

    setQuiz(quizArray)
    setRightAnswerId(1)
    setFormControl(createFromControls())
    setIsFormValid(false)
  }

  const createQuizHandler = event => {
    event.preventDefault()
  
    console.log(quiz)
  }

  const select = <Select
    label = 'Выберете правильный ответ'
    value = {rightAnswerId}
    onChange = {selectChangeHandler}
    answers = {[
      {text: 'Ответ 1', value: 1},
      {text: 'Ответ 2', value: 2},
      {text: 'Ответ 3', value: 3},
      {text: 'Ответ 4', value: 4},
    ]}
  />

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          
          {renderControls()}

          {select}

          <Button 
            type = "primary" 
            onClick = {addQuestionHandler}
            disabled = {!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button 
            type = "success" 
            onClick = {createQuizHandler}
            disabled = {quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
}

export default QuizCreator;
