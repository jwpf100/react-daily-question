import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {
  extractMdQuestionOnly,
  extractMdQuestionAndAnswer,
} from '../../utlils/utils'

const DailyQuestion = ({ className, dailyQuestion }) => {
  const [questionOnly, setQuestionOnly] = useState(true)

  const questionMd = extractMdQuestionOnly(
    dailyQuestion.markdown,
    dailyQuestion.number
  )

  console.log(dailyQuestion.markdown)

  return (
    <div className={[className].join('')}>
      <ReactMarkdown
        plugins={[[gfm, { singleTilde: false }]]}
        source={questionOnly ? questionMd : dailyQuestion.markdown}
      />
      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          setQuestionOnly(prevQuestionOnly => !prevQuestionOnly)
        }}
      >
        Reveal Answer
      </button>
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
}
