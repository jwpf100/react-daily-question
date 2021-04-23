// function from stack exchange to check size of files in local storage

const checkLocalStorage = () => {
  let _lsTotal = 0
  let _xLen
  let _x
  // eslint-disable-next-line no-restricted-syntax
  for (_x in localStorage) {
    // eslint-disable-next-line no-prototype-builtins
    if (!localStorage.hasOwnProperty(_x)) {
      // eslint-disable-next-line no-continue
      continue
    }
    _xLen = (localStorage[_x].length + _x.length) * 2
    _lsTotal += _xLen
    console.log(`${_x.substr(0, 50)} = ${(_xLen / 1024).toFixed(2)} KB`)
  }
  console.log(`Total = ${(_lsTotal / 1024).toFixed(2)} KB`)
}

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
  checkLocalStorage,
}
