import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FetchData from '../../hooks/FetchData'
import { checkCurrentQuestionDate } from '../../utlils/utils'
import {
  addCurrentQuestionLocally,
  addSeenQuestionArrayLocally,
  addAvailableQuestionArrayLocally,
} from '../../utlils/localStorage'
import {
  newQuestion,
  createAvailableQuestionsArray,
} from '../../utlils/questionArrays'
import StyledDailyQuestion from '../DailyQuestion/DailyQuestion'
import TestingSection from '../TestingSection/TestingSection'
import QuestionlistDisplay from '../QuestionListDisplay'
import FetchLocalData from '../../hooks/FetchLocalData'

const MainQuestionDisplay = ({ className }) => {
  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

  // Custom hook to bring in MD Data
  const { mdFile, loading, error } = FetchData(mdDocumentPath)
  const {
    currentQuestion,
    setCurrentQuestion,
    seenQuestionArray,
    setSeenQuestionArray,
    availableQuestionsArray,
    setAvailableQuestionsArray,
    dataLocalStorage,
  } = FetchLocalData(loading)

  useEffect(() => {
    if (dataLocalStorage && !loading && mdFile !== '') {
      setAvailableQuestionsArray(
        createAvailableQuestionsArray(mdFile, seenQuestionArray)
      )
    }
  }, [loading])

  useEffect(() => {
    if (dataLocalStorage) {
      addCurrentQuestionLocally(currentQuestion)
      addSeenQuestionArrayLocally(seenQuestionArray)
    }
  }, [currentQuestion])

  // When availableQuestionsArray changes, add that to local storage
  useEffect(() => {
    if (dataLocalStorage) {
      addAvailableQuestionArrayLocally(availableQuestionsArray)
      // Once mdFile has loaded, check if current question needs to be changed, then update current and seen questions
      if (
        dataLocalStorage &&
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
    }
  }, [availableQuestionsArray])

  // If there is a current question, display Main question display.  Fallbacks if data not present.

  console.log(`current Question? = ${currentQuestion}`)
  if (
    // Check if currentQuestion is defined first
    currentQuestion &&
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
