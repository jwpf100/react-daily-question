const addCurrentQuestionLocally = questionObject => {
  window.localStorage.setItem(
    'currentQuestionLocal',
    JSON.stringify(questionObject)
  )
}

const showCurrentQuestionLocally = () => {
  console.log(JSON.parse(window.localStorage.getItem('currentQuestionLocal')))
}

export { addCurrentQuestionLocally, showCurrentQuestionLocally }
