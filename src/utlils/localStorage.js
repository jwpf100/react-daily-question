const addCurrentQuestionLocally = questionObject => {
  window.localStorage.setItem(
    'currentQuestionLocal',
    JSON.stringify(questionObject)
  )
}

const showCurrentQuestionLocally = () => {
  console.log(JSON.parse(window.localStorage.getItem('currentQuestionLocal')))
}

const getCurrentQuestionLocally = () =>
  JSON.parse(window.localStorage.getItem('currentQuestionLocal'))

export {
  getCurrentQuestionLocally,
  addCurrentQuestionLocally,
  showCurrentQuestionLocally,
}
