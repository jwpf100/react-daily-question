import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { checkLocalStorage } from '../../utlils/localStorage'

import {
  checkPresent,
  generateUniqueRandomQuestionNumber,
} from '../../utlils/questionArrays'

const TestingSection = ({
  currentQuestion,
  seenQuestionArray,
  mdSource,
  questionArray,
}) => {
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

  const testQuestionObject4 = {
    number: 2,
    question: 'What are the major features of React?',
    date: new Date('2018-05-05'),
    markdown:
      "2. ### What are inline conditional expressions?↵↵    You can use either *if statements* or *ternary expressions* which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`.↵↵    ```jsx harmony↵    <h1>Hello!</h1>↵    {↵        messages.length > 0 && !isLogin?↵          <h2>↵              You have {messages.length} unread messages.↵          </h2>↵          :↵          <h2>↵              You don't have unread messages.↵          </h2>↵    }↵    ```↵↵↵   ",
  }

  const handleLocalStorageCheck = () => {
    checkLocalStorage()
  }

  const handleCheckPresent = () => {
    console.log(checkPresent(currentQuestion, seenQuestionArray))
  }

  const handleUniqueNumber = () => {
    console.log(generateUniqueRandomQuestionNumber(mdSource, seenQuestionArray))
  }

  const showQuestionArray = () => {
    console.log(questionArray)
  }

  return (
    <div>
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
        onClick={() => {
          console.log(seenQuestionArray)
        }}
      >
        Console.log seenQuestionArray
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleLocalStorageCheck}
      >
        localStorageSize
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleCheckPresent}
      >
        CheckPresent
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleUniqueNumber}
      >
        Generate Random handleUniqueNumber
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={showQuestionArray}
      >
        Show Total Question Array
      </button>
    </div>
  )
}

const StyledTestingSection = styled(TestingSection)`
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

export default StyledTestingSection

TestingSection.propTypes = {
  currentQuestion: PropTypes.object,
}
