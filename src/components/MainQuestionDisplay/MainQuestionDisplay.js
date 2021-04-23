import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FetchData from '../../hooks/FetchData'
import {
  checkCurrentQuestionDate,
  generateRandomQuestionNumber,
  extractQuestionOnly,
  extractMdQuestionAndAnswer,
} from '../../utlils/utils'
import {
  addCurrentQuestionLocally,
  getCurrentQuestionLocally,
  checkListOfQuestionsSeen,
  addSeenQuestionArrayLocally,
} from '../../utlils/localStorage'
import { pushToArray } from '../../utlils/questionArrays'
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

  // Check for loading to finish, mdFile to be populated, currentQuestion date to be DIFFERENT to current date (i.e. need a new question) and then set the current question to a new random question.

  useEffect(() => {
    if (
      !loading &&
      mdFile !== '' &&
      !checkCurrentQuestionDate(currentQuestion.date)
    ) {
      const newQuestionNumber = generateRandomQuestionNumber(mdFile)
      setCurrentQuestion({
        number: newQuestionNumber,
        date: new Date(),
        question: extractQuestionOnly(mdFile, newQuestionNumber),
        markdown: extractMdQuestionAndAnswer(mdFile, newQuestionNumber),
      })
    }
  }, [loading])

  // When currentQuesiton changes, add that question to local storage and to the seenquestion array

  useEffect(() => {
    addCurrentQuestionLocally(currentQuestion)
    setSeenQuestionArray(pushToArray(currentQuestion, seenQuestionArray))
  }, [currentQuestion])

  // When the seen question array gets updated, add to local storage

  useEffect(() => {
    addSeenQuestionArrayLocally(seenQuestionArray)
  }, [seenQuestionArray])

  if (
    Object.keys(currentQuestion).length > 0 &&
    checkCurrentQuestionDate(currentQuestion.date)
  ) {
    return (
      <div className={[className, 'container'].join(' ')}>
        <h2 className="display-5">React Question of the Day</h2>
        <h3>Current Question Present</h3>
        <StyledDailyQuestion
          dailyQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          mdSource={mdFile}
          seenQuestionArray={seenQuestionArray}
        />
        <TestingSection
          currentQuestion={currentQuestion}
          seenQuestionArray={seenQuestionArray}
          mdSource={mdFile}
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
