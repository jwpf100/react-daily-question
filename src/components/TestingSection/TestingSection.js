import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  checkLocalStorage,
  removeTotalListOfQuestions,
} from '../../utlils/localStorage'

import { createTotalQuestionArray } from '../../utlils/questionArrays'

const TestingSection = ({
  currentQuestion,
  seenQuestionArray,
  mdSource,
  questionArray,
  maxNumber,
  availableQuestionsArray,
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

  const handleRemoveTotalList = () => {
    removeTotalListOfQuestions()
  }

  const showAvailableQArray = () => {
    console.log(availableQuestionsArray)
  }

  const handleCreateTotalQsArray = () => {
    const totalQArray = createTotalQuestionArray(mdSource)
    const missingQsArray = []
    console.log(totalQArray)
    for (let i = 0; i < totalQArray.length; i += 1) {
      if (totalQArray[i].question === undefined) {
        missingQsArray.push(totalQArray[i])
        console.log(totalQArray[i])
      }
      /* if (totalQArray[i].number + 1 !== totalQArray[i + 1].number) {
        missingQsArray.push(totalQArray[i])
      } */
    }
    console.log(missingQsArray)
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
        onClick={handleRemoveTotalList}
      >
        Remove Total List Questions
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={showAvailableQArray}
      >
        Show Avalable Qs Array
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleCreateTotalQsArray}
      >
        Create Total Qs Array
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
  seenQuestionArray: PropTypes.array,
  mdSource: PropTypes.string,
  questionArray: PropTypes.array,
  maxNumber: PropTypes.number,
  availableQuestionsArray: PropTypes.array,
}
