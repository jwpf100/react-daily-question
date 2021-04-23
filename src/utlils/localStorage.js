const addCurrentQuestionLocally = questionObject => {
  window.localStorage.setItem(
    'currentQuestionLocal',
    JSON.stringify(questionObject)
  )
}

const getCurrentQuestionLocally = () =>
  JSON.parse(window.localStorage.getItem('currentQuestionLocal'))

const checkListOfQuestionsSeen = () => {
  const getListOfQuestionsSeen = () =>
    JSON.parse(window.localStorage.getItem('seenQuestionArrayLocal'))

  return getListOfQuestionsSeen() === null ? [] : getListOfQuestionsSeen()
}

// Push to seenQuestionArrayLocal

const addSeenQuestionArrayLocally = array => {
  window.localStorage.setItem('seenQuestionArrayLocal', JSON.stringify(array))
}

// For testing

const removeListOfQuestionsSeen = () =>
  window.localStorage.removeItem('seenQuestionArrayLocal')

const showCurrentQuestionLocally = () => {
  console.log(JSON.parse(window.localStorage.getItem('currentQuestionLocal')))
}

export {
  addCurrentQuestionLocally,
  getCurrentQuestionLocally,
  showCurrentQuestionLocally,
  removeListOfQuestionsSeen,
  addSeenQuestionArrayLocally,
  checkListOfQuestionsSeen,
}
