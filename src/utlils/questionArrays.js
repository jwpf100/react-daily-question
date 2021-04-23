import {
  checkCurrentQuestionDate,
  generateRandomQuestionNumber,
  extractQuestionOnly,
  extractMdQuestionAndAnswer,
  searchMaxNumber,
} from './utils'

// check ifPresentInArray

const checkPresent = (question, array) => {
  const found = array.find(element => element.question === question.question)
  return !!found
}

const checkPresentUnique = (question, array) => {
  const found = array.find(element => element.question === question)
  return !!found
}

const generateUniqueRandomQuestionNumber = (mdSource, array) => {
  const maxQuestionNo = searchMaxNumber(mdSource)
  const number = Math.floor(Math.random() * maxQuestionNo + 1)
  const question = extractQuestionOnly(mdSource, number)

  if (checkPresentUnique(question, array) === true) {
    generateUniqueRandomQuestionNumber(mdSource, array)
  } else {
    return number
  }
}

// Get a new current question
const newQuestion = (mdSource, setCurrentQuestion, seenQuestionArray) => {
  const newQuestionNumber = generateUniqueRandomQuestionNumber(
    mdSource,
    seenQuestionArray
  )
  checkPresent(newQuestionNumber, seenQuestionArray)

  setCurrentQuestion({
    number: newQuestionNumber,
    date: new Date(),
    question: extractQuestionOnly(mdSource, newQuestionNumber),
    markdown: extractMdQuestionAndAnswer(mdSource, newQuestionNumber),
  })
}

// push to array unless already present

const pushToArray = (question, array) => {
  const found = array.find(element => element.question === question.question)
  const abridgedQuestion = {
    number: question.number,
    date: question.date,
    question: question.question,
  }
  if (!found) {
    array.push(abridgedQuestion)
  }
  return array
}

export {
  pushToArray,
  newQuestion,
  checkPresent,
  generateUniqueRandomQuestionNumber,
}
