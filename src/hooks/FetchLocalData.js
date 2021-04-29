import { useState, useEffect } from 'react'
import {
  getCurrentQuestionLocally,
  checkListOfQuestionsSeen,
  checkListOfAvailableQuestions,
} from '../utlils/localStorage'

const FetchLocalData = () => {
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [seenQuestionArray, setSeenQuestionArray] = useState([])
  const [availableQuestionsArray, setAvailableQuestionsArray] = useState()
  const [dataLocalStorage, setDataLocalStorage] = useState(false)

  useEffect(() => {
    setCurrentQuestion(getCurrentQuestionLocally())
    setSeenQuestionArray(checkListOfQuestionsSeen())
    setAvailableQuestionsArray(checkListOfAvailableQuestions())
    setDataLocalStorage(true)
  }, [])

  return {
    currentQuestion,
    setCurrentQuestion,
    seenQuestionArray,
    setSeenQuestionArray,
    availableQuestionsArray,
    setAvailableQuestionsArray,
    dataLocalStorage,
  }
}

export default FetchLocalData
