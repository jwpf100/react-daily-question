import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { extractMdQuestionOnly } from '../../utlils/utils'
import { newQuestion } from '../../utlils/questionArrays'

const DailyQuestion = ({
  className,
  currentQuestion,
  setCurrentQuestion,
  mdSource,
  seenQuestionArray,
  setSeenQuestionArray,
  availableQuestionsArray,
  setAvailableQuestionsArray,
}) => {
  const [questionOnly, setQuestionOnly] = useState(true)

  const questionMd = extractMdQuestionOnly(
    currentQuestion.markdown,
    currentQuestion.number
  )

  const handleGetNewQuestion = () => {
    newQuestion(
      mdSource,
      setCurrentQuestion,
      seenQuestionArray,
      setSeenQuestionArray,
      availableQuestionsArray,
      setAvailableQuestionsArray
    )
  }

  const handleResetSeenQuestions = () => {
    setCurrentQuestion([currentQuestion])
    setSeenQuestionArray([currentQuestion])
  }

  return (
    <div className={[className].join('')}>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          setQuestionOnly(prevQuestionOnly => !prevQuestionOnly)
        }}
      >
        Reveal Answer
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleGetNewQuestion}
      >
        Select New Question
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleResetSeenQuestions}
      >
        Reset Seen Questions
      </button>
      <ReactMarkdown
        plugins={[[gfm, { singleTilde: false }]]}
        source={questionOnly ? questionMd : currentQuestion.markdown}
      />
    </div>
  )
}

const StyledDailyQuestion = styled(DailyQuestion)`
  overflow: auto;
  padding: 3rem 0 0 0;

  ol {
    list-style-type: none;
    padding-left: 0;
  }

  button {
    margin: 1rem;
  }
`

export default StyledDailyQuestion

DailyQuestion.propTypes = {
  className: PropTypes.string,
  currentQuestion: PropTypes.object,
  setCurrentQuestion: PropTypes.func,
  mdSource: PropTypes.string,
  seenQuestionArray: PropTypes.array,
  setSeenQuestionArray: PropTypes.func,
  availableQuestionsArray: PropTypes.array,
  setAvailableQuestionsArray: PropTypes.func,
}
