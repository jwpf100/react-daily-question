// function from stack exchange to check size of files in local storage

const currentQuestionLocal = 'currentQuestionLocal'
const seenQuestionArray = 'seenQuestionArrayLocal'
const totalQuestionArray = 'totalQuestionArrayLocal'
const availableQuestionArray = 'availableQuestionArrayLocal'

const isBrowser = typeof window !== 'undefined'

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

// CURRENT QUESTION

const addCurrentQuestionLocally = questionObject => {
  if (isBrowser) {
    window.localStorage.setItem(
      currentQuestionLocal,
      JSON.stringify(questionObject)
    )
  }
}

const getCurrentQuestionLocally = () => {
  if (isBrowser) {
    const getCurrentQuestion = window.localStorage.getItem(currentQuestionLocal)
    if (getCurrentQuestion === 'undefined') {
      return {}
    }
    JSON.parse(window.localStorage.getItem(currentQuestionLocal))
  }
}

// SEEN QUESTION ARRAY

// GET

const checkListOfQuestionsSeen = () => {
  if (isBrowser) {
    const getListOfQuestionsSeen = () =>
      JSON.parse(window.localStorage.getItem(seenQuestionArray))

    return getListOfQuestionsSeen() === null ? [] : getListOfQuestionsSeen()
  }
}
// SET

const addSeenQuestionArrayLocally = array => {
  if (isBrowser) {
    window.localStorage.setItem(seenQuestionArray, JSON.stringify(array))
  }
}
// TOTAL QUESTION ARRAY

// GET

const checkListOfAllQuestions = () => {
  if (isBrowser) {
    const getListOfQuestionsSeen = () =>
      JSON.parse(window.localStorage.getItem(totalQuestionArray))

    return getListOfQuestionsSeen() === null ? [] : getListOfQuestionsSeen()
  }
}

// SET
const addAllQuestionArrayLocally = array => {
  if (isBrowser) {
    window.localStorage.setItem(totalQuestionArray, JSON.stringify(array))
  }
}

// AVAILABLE QUESTION ARRAY

// GET

const checkListOfAvailableQuestions = () => {
  if (isBrowser) {
    const getListOfAvailableQuestions = () =>
      JSON.parse(window.localStorage.getItem(availableQuestionArray))

    return getListOfAvailableQuestions() === null
      ? []
      : getListOfAvailableQuestions()
  }
}

// SET
const addAvailableQuestionArrayLocally = array => {
  if (isBrowser) {
    window.localStorage.setItem(availableQuestionArray, JSON.stringify(array))
  }
}

// For testing

const removeListOfQuestionsSeen = () => {
  if (isBrowser) {
    window.localStorage.removeItem(seenQuestionArray)
  }
}

const removeTotalListOfQuestions = () => {
  if (isBrowser) {
    window.localStorage.removeItem(totalQuestionArray)
  }
}

const showCurrentQuestionLocally = () => {
  if (isBrowser) {
    console.log(JSON.parse(window.localStorage.getItem(seenQuestionArray)))
  }
}

export {
  addCurrentQuestionLocally,
  getCurrentQuestionLocally,
  showCurrentQuestionLocally,
  removeListOfQuestionsSeen,
  addSeenQuestionArrayLocally,
  checkListOfQuestionsSeen,
  checkLocalStorage,
  removeTotalListOfQuestions,
  checkListOfAllQuestions,
  addAllQuestionArrayLocally,
  checkListOfAvailableQuestions,
  addAvailableQuestionArrayLocally,
}
