import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FetchData from '../../hooks/FetchData'
import { checkCurrentQuestionDate, searchMaxNumber } from '../../utlils/utils'
import {
  addCurrentQuestionLocally,
  getCurrentQuestionLocally,
  checkListOfQuestionsSeen,
  addSeenQuestionArrayLocally,
  checkListOfAllQuestions,
  addAllQuestionArrayLocally,
  addAvailableQuestionArrayLocally,
  checkListOfAvailableQuestions,
} from '../../utlils/localStorage'
import {
  newQuestion,
  pushToArray,
  createTotalQuestionArray,
  createAvailableQuestionsArray,
} from '../../utlils/questionArrays'
import StyledDailyQuestion from '../DailyQuestion/DailyQuestion'
import TestingSection from '../TestingSection/TestingSection'
import QuestionlistDisplay from '../QuestionListDisplay'

const MainQuestionDisplay = ({ className }) => {
  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

  // Custom hook to bring in MD Data
  const { mdFile, loading, error } = FetchData(mdDocumentPath)
  // Set current question initially from local storage
  const [currentQuestion, setCurrentQuestion] = useState(
    getCurrentQuestionLocally()
  )
  // Set seen question array initially from local storage
  const [seenQuestionArray, setSeenQuestionArray] = useState(
    checkListOfQuestionsSeen()
  )
  const [allQuestionArray, setAllQuestionArray] = useState([]) // REMOVE

  const [availableQuestionsArray, setAvailableQuestionsArray] = useState(
    checkListOfAvailableQuestions()
  )

  // Check for loading to finish, mdFile to be populated, currentQuestion date to be DIFFERENT to current date (i.e. need a new question) and then set the current question to a new random question.

  useEffect(() => {
    if (!loading && mdFile !== '') {
      setAvailableQuestionsArray(
        createAvailableQuestionsArray(mdFile, seenQuestionArray)
      )
    }
    // Once mdFile has loaded, check if current question needs to be changed, then update curren and seen questions
    if (
      !loading &&
      mdFile !== '' &&
      !checkCurrentQuestionDate(currentQuestion.date)
    ) {
      newQuestion(
        mdFile,
        setCurrentQuestion,
        seenQuestionArray,
        setSeenQuestionArray,
        availableQuestionsArray,
        setAvailableQuestionsArray
      )
    }
  }, [loading])

  // When currentQuesiton changes, add that question to local storage and to the seenquestion array
  // When the seen question array gets updated, add to local storage
  useEffect(() => {
    addCurrentQuestionLocally(currentQuestion)
    addSeenQuestionArrayLocally(seenQuestionArray)
  }, [currentQuestion])

  useEffect(() => {
    addAvailableQuestionArrayLocally(availableQuestionsArray)
  }, [availableQuestionsArray])

  // Transact based on state:

  if (
    Object.keys(currentQuestion).length > 0 &&
    checkCurrentQuestionDate(currentQuestion.date)
  ) {
    return (
      <div className={[className, 'container'].join(' ')}>
        <h2 className="display-5">React Question of the Day</h2>
        <h3>Current Question Present</h3>
        <StyledDailyQuestion
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          mdSource={mdFile}
          seenQuestionArray={seenQuestionArray}
          setSeenQuestionArray={setSeenQuestionArray}
          availableQuestionsArray={availableQuestionsArray}
          setAvailableQuestionsArray={setAvailableQuestionsArray}
        />
        <QuestionlistDisplay
          availableArray={availableQuestionsArray}
          answeredArray={seenQuestionArray}
          currentQuestion={currentQuestion}
        />
        <TestingSection
          currentQuestion={currentQuestion}
          seenQuestionArray={seenQuestionArray}
          mdSource={mdFile}
          questionArray={allQuestionArray}
          availableQuestionsArray={availableQuestionsArray}
        />
      </div>
    )
  }
  if (!loading) {
    return (
      <div className={[className, 'container'].join(' ')}>
        <h2 className="display-5">React Question of the Day</h2>
        <h3>Data Has Loaded</h3>
      </div>
    )
  }
  return (
    <div className={[className, 'container'].join(' ')}>
      <h2 className="display-5">React Question of the Day</h2>
      <h3>Data Is Loading</h3>
    </div>
  )
}

const StyledMainQuestionDisplay = styled(MainQuestionDisplay)`
  box-sizing: border-box;
  height: 80%;

  .answer-box {
    overflow: auto;
    padding: 3rem 0 0 0;
  }

  ol {
    list-style-type: none;
    padding-left: 0;
  }

  button {
    margin: 1rem;
  }
`

export default StyledMainQuestionDisplay

MainQuestionDisplay.propTypes = {
  className: PropTypes.string,
}
