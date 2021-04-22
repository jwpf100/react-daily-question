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
import StyledDailyQuestion from '../DailyQuestion/DailyQuestion'

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

  useEffect(() => {
    if (
      !loading &&
      mdFile !== '' &&
      !checkCurrentQuestionDate(currentQuestion.date)
    ) {
      /* &&
      !checkCurrentQuestionDate(currentQuestion.date) */
      console.log('change current question should fire')
      const newQuestionNumber = generateRandomQuestionNumber(mdFile)

      const date = new Date()
      const question = extractQuestionOnly(mdFile, newQuestionNumber)

      const markdown = extractMdQuestionAndAnswer(mdFile, newQuestionNumber)

      setCurrentQuestion({
        number: newQuestionNumber,
        date,
        question,
        markdown,
      })
    }
  }, [loading])

  useEffect(() => {
    window.localStorage.setItem(
      'currentQuestionLocal',
      JSON.stringify(currentQuestion)
    )
  }, [currentQuestion])

  const testQuestionObject = {
    number: 2,
    question: 'What are the major features of React?',
    date: new Date(),
    markdown:
      "2. ### What are inline conditional expressions?↵↵    You can use either *if statements* or *ternary expressions* which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`.↵↵    ```jsx harmony↵    <h1>Hello!</h1>↵    {↵        messages.length > 0 && !isLogin?↵          <h2>↵              You have {messages.length} unread messages.↵          </h2>↵          :↵          <h2>↵              You don't have unread messages.↵          </h2>↵    }↵    ```↵↵↵   ",
  }

  const testQuestionObject2 = {
    markdown:
      "17. ### What are inline conditional expressions?↵↵    You can use either *if statements* or *ternary expressions* which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`.↵↵    ```jsx harmony↵    <h1>Hello!</h1>↵    {↵        messages.length > 0 && !isLogin?↵          <h2>↵              You have {messages.length} unread messages.↵          </h2>↵          :↵          <h2>↵              You don't have unread messages.↵          </h2>↵    }↵    ```↵↵↵   ",
    number: 17,
    question: 'What are inline conditional expressions?',
  }

  const testQuestionObject3 = {}

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

  if (
    Object.keys(currentQuestion).length > 0 &&
    checkCurrentQuestionDate(currentQuestion.date)
  ) {
    return (
      <div className={[className, 'container'].join(' ')}>
        <h2 className="display-5">React Question of the Day</h2>
        <h3>Current Question Present</h3>
        <StyledDailyQuestion dailyQuestion={currentQuestion} />
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
          onClick={() => addCurrentQuestionLocally(testQuestionObject3)}
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
    )
  }
  if (!loading) {
    return (
      <div className={[className, 'container'].join(' ')}>
        <h2 className="display-5">React Question of the Day</h2>
        <h3>Data Has Loaded</h3>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => addCurrentQuestionLocally(testQuestionObject)}
        >
          Set Local Current Question
        </button>
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
