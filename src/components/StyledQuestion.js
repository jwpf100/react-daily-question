import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { createQuestionArray, searchMaxNumber } from '../utlils/utils'
import QuestionListDisplay from './QuestionListDisplay/QuestionListDisplay'

const QuestionDiv = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [mdFile, setMdFile] = useState('')
  const [questionNo, setQuestionNo] = useState(0)
  const [questionText, setQuestionText] = useState('')
  const [totalQuestionArray, setTotalQuestionArray] = useState('')
  const [answeredQuestionArray, setAnsweredQuestionArray] = useState('')

  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

  // Formula to set a question number that will be displayed.  Used when page loads and again via a button.
  const generateQuestionNumber = () => {
    const maxQuestionNo = 329 + 1 // 329+1
    setQuestionNo(Math.floor(Math.random() * maxQuestionNo + 1))
    // setQuestionNo(22)
  }

  const returnQuestion = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = mdFile.indexOf(searchTerm)
    const indexOfEndSearch = mdFile.indexOf(`?`, indexOfSearch) + 1
    const searchResult = mdFile.substring(indexOfSearch, indexOfEndSearch)
    setQuestionText(searchResult)
  }

  const returnAnswer = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = mdFile.indexOf(searchTerm)
    const indexOfEndSearch = mdFile.indexOf(
      `**[⬆ Back to Top](#table-of-contents)**`,
      indexOfSearch
    )
    const searchResult = mdFile.substring(indexOfSearch, indexOfEndSearch)
    setQuestionText(searchResult)
  }

  const createTotalQuestionArray = () => {
    setTotalQuestionArray(createQuestionArray(mdFile))
  }

  const storeArrayLocally = () => {
    // store questionArray in local storage
    window.localStorage.setItem(
      'totalQuestionArray',
      JSON.stringify(totalQuestionArray)
    )
  }

  const displayTotalQuestionArray = () => {
    // store questionArray in local storage
    console.log(JSON.parse(window.localStorage.getItem('totalQuestionArray')))
  }

  const clearLocalStorage = () => {
    // store questionArray in local storage
    window.localStorage.removeItem('totalQuestionArray')
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(mdDocumentPath).then(response =>
        response.text()
      )
      setMdFile(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (mdFile !== '') {
      generateQuestionNumber()
    }
  }, [mdFile])

  useEffect(() => {
    returnQuestion()
    setIsLoading(false)
  }, [questionNo])

  return (
    <>
      {!isLoading ? (
        <div className={className}>
          <h2 className="display-4">React Question of the Day</h2>
          <h3>Question {questionNo}</h3>
          <div className="answer-box">
            <ReactMarkdown
              plugins={[[gfm, { singleTilde: false }]]}
              source={questionText}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={returnAnswer}
            >
              Reveal Answer
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={createTotalQuestionArray}
            >
              Create Question Array
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={storeArrayLocally}
            >
              Store Total Array Locally
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={displayTotalQuestionArray}
            >
              Display Array in Console
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={clearLocalStorage}
            >
              Clear Local Storage
            </button>
            <QuestionListDisplay questionArray={totalQuestionArray} />
          </div>
        </div>
      ) : (
        <div className={className}>
          <h2 className="display-5">React Question of the Day</h2>
          <h3>Question {questionNo}</h3>
        </div>
      )}
    </>
  )
}

const StyledQuestionDiv = styled(QuestionDiv)`
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

export default StyledQuestionDiv

QuestionDiv.propTypes = {
  className: PropTypes.string,
}
