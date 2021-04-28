import {
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
  console.log(`generateUnique question() ${number}`)
  const question = extractQuestionOnly(mdSource, number)

  if (checkPresentUnique(question, array) === true) {
    generateUniqueRandomQuestionNumber(mdSource, array)
  } else {
    return number
  }
}

const selectFromAvailableQuestions = availableQuestionArray => {
  const noOfQuestions = availableQuestionArray.length
  const number = Math.floor(Math.random() * noOfQuestions + 1)
  return availableQuestionArray[number].number
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

const createAvailableQuestionsArray = (mdSource, seenQuestionArray) => {
  const maxQuestionNo = parseInt(searchMaxNumber(mdSource), 10)
  const availableQuestionArray = []
  for (let i = 1; i < maxQuestionNo + 1; i += 1) {
    const questionToAdd = {
      number: i,
      question: extractQuestionOnly(mdSource, i),
    }
    // Check if in seen question array
    if (
      !seenQuestionArray.find(
        ({ question }) => question === questionToAdd.question
      )
    ) {
      availableQuestionArray.push(questionToAdd)
    }

    // If Yes, make sure that seen question number is correct (same as in mdfile)
  }
  return availableQuestionArray
}

// Get a new current question
const newQuestion = (
  mdSource,
  setCurrentQuestion,
  seenQuestionArray,
  setSeenQuestionArray,
  availableQuestionsArray,
  setAvailableQuestionsArray
) => {
  // const newQuestionNumber = generateUniqueRandomQuestionNumber(
  //   mdSource,
  //   seenQuestionArray
  // )
  const newQuestionNumber = selectFromAvailableQuestions(
    availableQuestionsArray
  )
  // I think this is redundant due to adding the unique check in the function above
  // checkPresent(newQuestionNumber, seenQuestionArray)

  const questionToAdd = {
    number: newQuestionNumber,
    date: new Date(),
    question: extractQuestionOnly(mdSource, newQuestionNumber),
    markdown: extractMdQuestionAndAnswer(mdSource, newQuestionNumber),
  }

  setCurrentQuestion(questionToAdd)
  const array = pushToArray(questionToAdd, seenQuestionArray)
  setSeenQuestionArray(array)
  setAvailableQuestionsArray(createAvailableQuestionsArray(mdSource, array))
}

const createTotalQuestionArray = mdSource => {
  const maxQuestion = parseInt(searchMaxNumber(mdSource), 10)
  const questionArray = []
  for (let i = 1; i < maxQuestion + 1; i += 1) {
    // Add to the array
    questionArray.push({
      number: i,
      question: extractQuestionOnly(mdSource, i),
    })
  }
  return questionArray
}

export {
  pushToArray,
  newQuestion,
  checkPresent,
  generateUniqueRandomQuestionNumber,
  createTotalQuestionArray,
  createAvailableQuestionsArray,
}
