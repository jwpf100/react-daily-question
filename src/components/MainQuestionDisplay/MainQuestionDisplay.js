import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FetchData from '../../hooks/FetchData'

const MainQuestionDisplay = ({ className }) => {
  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'
  // Custom hook to bring in MD Data
  const { mdFile, loading, error } = FetchData(mdDocumentPath)
  const [currentQuestion, setCurrentQuestion] = {
    number: 2,
    question: 'What are the major features of React?',
    date: 'Thu Apr 22 2021 12:35:04 GMT+0100 (British Summer Time)',
    markdown: '2. ### What are the major features of React?',
  }

  const now = new Date()
  console.log(now)

  return (
    <>
      {!loading ? (
        <div className={[className, 'container'].join(' ')}>
          <h2 className="display-5">React Question of the Day</h2>
          <h3>Question Has Loaded</h3>
        </div>
      ) : (
        <div className={[className, 'container'].join(' ')}>
          <h2 className="display-5">React Question of the Day</h2>
          <h3>Question Is Loading</h3>
        </div>
      )}
    </>
  )
}

export default StyledMainQuestionDisplay

MainQuestionDisplay.propTypes = {
  className: PropTypes.string,
}
