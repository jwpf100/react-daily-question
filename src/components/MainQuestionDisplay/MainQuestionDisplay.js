import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FetchData from '../../hooks/FetchData'
import { checkCurrentQuestionDate } from '../../utlils/utils'

const MainQuestionDisplay = ({ className }) => {
  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'
  // Custom hook to bring in MD Data
  const { mdFile, loading, error } = FetchData(mdDocumentPath)
  const [currentQuestion, setCurrentQuestion] = useState(
    JSON.parse(window.localStorage.getItem('currentQuestionLocal'))
  )

  const handleCurrentQuestion = () => {
    // Test for a currentquestion
    if (
      Object.keys(currentQuestion).length > 0 &&
      checkCurrentQuestionDate(currentQuestion.date)
    ) {
      // displayQuestion
      console.log('display question')
    } else {
      // choose a new question
      console.log('choose new question')
    }
  }

  const testQuestionObject = {
    number: 2,
    question: 'What are the major features of React?',
    date: new Date(),
    markdown: '2. ### What are the major features of React?',
  }

  const testQuestionObject2 = {}

  const addCurrentQuestionLocally = questionObject => {
    window.localStorage.setItem(
      'currentQuestionLocal',
      JSON.stringify(questionObject)
    )
  }

  const showCurrentQuestionLocally = questionObject => {
    console.log(JSON.parse(window.localStorage.getItem('currentQuestionLocal')))
  }

  const handleQuestion = () => {
    console.log(handleCurrentQuestion())
  }

  return (
    <>
      {!loading ? (
        <div className={[className, 'container'].join(' ')}>
          <h2 className="display-5">React Question of the Day</h2>
          <h3>Data Has Loaded</h3>
          <h4>{currentQuestion.question}</h4>
          <button
            type="button"
            className="btn btn-light"
            onClick={checkCurrentQuestionDate}
          >
            Test
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleQuestion}
          >
            Set Current Question
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              console.log(currentQuestion)
            }}
          >
            Console.log Current Question
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => addCurrentQuestionLocally(testQuestionObject)}
          >
            Set Local Current Question
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={showCurrentQuestionLocally}
          >
            Console.log Local Current Question
          </button>
        </div>
      ) : (
        <div className={[className, 'container'].join(' ')}>
          <h2 className="display-5">React Question of the Day</h2>
          <h3>Data Is Loading</h3>
        </div>
      )}
    </>
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
