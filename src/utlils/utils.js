/* eslint-disable no-nested-ternary */

const setSearchTerm = number => {
  const searchTerm =
    number < 10
      ? `|${number.toString()}  |`
      : number < 100
      ? `|${number.toString()} |`
      : `|${number.toString()}|`
  return searchTerm
}

const setMdSearchTerm = number => {
  const searchTerm = `${number.toString()}. ###`
  return searchTerm
}

const extractQuestionOnly = (mdSource, questionNumber) => {
  const startOfQuestions = mdSource.indexOf(setSearchTerm(1))

  const searchTerm = setSearchTerm(questionNumber)
  // Location of question start point (search term)
  const searchStartIndex = mdSource.indexOf(searchTerm) + searchTerm.length

  // Check to see if the search term exists.  If it doesn't then it must have a lower index than the 1st question in the MD Doc (the search will return -1 + the length of the search)

  if (searchStartIndex > startOfQuestions) {
    // Location of first bracket in question
    const questionStartPoint = mdSource.indexOf('[', searchStartIndex)

    // Find closing bracket.  Use counter to ensure that there aren't brackets within the brackets I want to find. E.g.  [This is a question with brackets [inside] which wouldn't work if I just searched for the first closing bracket]

    let counter = 0
    let questionEndPoint = 0
    let j = questionStartPoint - 1
    do {
      j += 1
      switch (mdSource[j]) {
        case '[':
          counter += 1
          break
        case ']':
          counter -= 1
          break
        default:
      }
      questionEndPoint = j
    } while (counter !== 0)

    // Define the question using the start (questionStartPoint) and end (questionEndPoint) points

    return mdSource.slice(questionStartPoint + 1, questionEndPoint)
  }
}

const extractMdQuestionOnly = (mdSource, questionNumber) => {
  const mdSearchTerm = setMdSearchTerm(questionNumber)
  const indexOfSearch = mdSource.indexOf(mdSearchTerm)
  const indexOfEndSearch = mdSource.indexOf(`?`, indexOfSearch)
  return mdSource.substring(indexOfSearch, indexOfEndSearch + 1)
}

const extractMdQuestionAndAnswer = (mdSource, questionNumber) => {
  const mdSearchTerm = setMdSearchTerm(questionNumber)

  const indexOfSearch = mdSource.indexOf(mdSearchTerm)

  const indexOfEndSearch = mdSource.indexOf(
    `**[⬆ Back to Top](#table-of-contents)**`,
    indexOfSearch
  )
  return mdSource.substring(indexOfSearch, indexOfEndSearch)
}

const searchMaxNumber = mdSource => {
  const indexOfQ1 = mdSource.indexOf(setSearchTerm(1))
  let maxNumber = 0
  for (let i = 2; ; i += 1) {
    const searchNumber = setSearchTerm(i)
    const searchNumberPlusOne = setSearchTerm(i + 1)
    const searchNumberPlusTwo = setSearchTerm(i + 2)
    const searchNumberPlusThree = setSearchTerm(i + 3)
    if (mdSource.indexOf(searchNumber, indexOfQ1) === -1) {
      if (
        // Check that there aren't just gaps in the numbers, assuming that if the next three search terms return nothing then it's the end of the list
        mdSource.indexOf(searchNumberPlusOne, indexOfQ1) === -1 &&
        mdSource.indexOf(searchNumberPlusTwo, indexOfQ1) === -1 &&
        mdSource.indexOf(searchNumberPlusThree, indexOfQ1) === -1
      ) {
        return maxNumber
      }
    }
    maxNumber = i
  }
}

const generateRandomQuestionNumber = mdSource => {
  const maxQuestionNo = searchMaxNumber(mdSource)
  return Math.floor(Math.random() * maxQuestionNo + 1)
}

const checkCurrentQuestionDate = date => {
  const checkDate = new Date(date).setHours(0, 0, 0, 0)
  const currentDate = new Date().setHours(0, 0, 0, 0)
  return checkDate === currentDate
}

// create an array of numbers between min and max (edges included)
const range = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i)

export {
  setSearchTerm,
  searchMaxNumber,
  checkCurrentQuestionDate,
  extractMdQuestionOnly,
  extractMdQuestionAndAnswer,
  generateRandomQuestionNumber,
  extractQuestionOnly,
  range,
}
