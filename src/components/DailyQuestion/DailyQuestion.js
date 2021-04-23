import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { extractMdQuestionOnly } from '../../utlils/utils'
import { newQuestion } from '../../utlils/questionArrays'

const DailyQuestion = ({
  className,
  dailyQuestion,
  setCurrentQuestion,
  mdSource,
  seenQuestionArray,
}) => {
  const [questionOnly, setQuestionOnly] = useState(true)

  const questionMd = extractMdQuestionOnly(
    dailyQuestion.markdown,
    dailyQuestion.number
  )

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
        onClick={() => {
          newQuestion(mdSource, setCurrentQuestion, seenQuestionArray)
        }}
      >
        Select New Question
      </button>
      <ReactMarkdown
        plugins={[[gfm, { singleTilde: false }]]}
        source={questionOnly ? questionMd : dailyQuestion.markdown}
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
  dailyQuestion: PropTypes.object,
  setCurrentQuestion: PropTypes.func,
  mdSource: PropTypes.string,
}
