const addCurrentQuestionLocally = questionObject => {
  window.localStorage.setItem(
    'currentQuestionLocal',
    JSON.stringify(questionObject)
  )
}

const getCurrentQuestionLocally = () =>
  JSON.parse(window.localStorage.getItem('currentQuestionLocal'))

const getListOfQuestionsSeen = () =>
  JSON.parse(window.localStorage.getItem('seenQuestionArrayLocal'))

// For testing

const addSeenQuestionArrayLocally = questionArray => {
  window.localStorage.setItem(
    'seenQuestionArrayLocal',
    JSON.stringify(questionArray)
  )
}

const removeListOfQuestionsSeen = () =>
  JSON.parse(window.localStorage.removeItem('seenQuestionArrayLocal'))

const showCurrentQuestionLocally = () => {
  console.log(JSON.parse(window.localStorage.getItem('currentQuestionLocal')))
}

export {
  addCurrentQuestionLocally,
  getCurrentQuestionLocally,
  showCurrentQuestionLocally,
  getListOfQuestionsSeen,
  removeListOfQuestionsSeen,
  addSeenQuestionArrayLocally,
}
