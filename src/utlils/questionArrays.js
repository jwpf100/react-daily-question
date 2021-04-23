import {
  checkCurrentQuestionDate,
  generateRandomQuestionNumber,
  extractQuestionOnly,
  extractMdQuestionAndAnswer,
} from './utils'

// Get a new current question
const newQuestion = (mdSource, setCurrentQuestion) => {
  const newQuestionNumber = generateRandomQuestionNumber(mdSource)
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

export { pushToArray, newQuestion }
