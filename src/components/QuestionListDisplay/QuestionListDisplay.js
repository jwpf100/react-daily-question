import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StyledQuestionButton from '../QuestionButton/QuestionButton'
import { range } from '../../utlils/utils'

const QuestionListDisplay = ({
  availableArray,
  answeredArray,
  currentQuestion,
  className,
}) => {
  // compute based on state
  const seenStatus = newQuestion => {
    // Code
    if (currentQuestion.number === newQuestion) {
      return 'current'
    }
    if (answeredArray.find(({ number }) => number === newQuestion)) {
      return 'seen'
    }
    return 'unseen'
  }

  const setQuestion = newQuestionNo => {
    // Code
    if (currentQuestion.number === newQuestionNo) {
      return currentQuestion
    }
    if (answeredArray.find(({ number }) => number === newQuestionNo)) {
      return answeredArray.find(({ number }) => number === newQuestionNo)
    }
    if (availableArray.find(({ number }) => number === newQuestionNo)) {
      return availableArray.find(({ number }) => number === newQuestionNo)
    }
    return {
      number: newQuestionNo,
      question: 'Placeholder due to error',
    }
  }

  return (
    <>
      {availableArray.length < 2 ? (
        <div>Loading</div>
      ) : (
        <div className={['d-flex flex-wrap', className].join(' ')}>
          <h3 className="w-100 text-center">Questions</h3>
          {/* Map through full question list.  If the question is also in the answeredArray turn it green. */}
          {range(1, 329).map((question, index) => (
            <StyledQuestionButton
              key={index}
              question={setQuestion(question)}
              status={seenStatus(question)}
            />
          ))}

          {/* {questionArray.map((question, index) => (
            <StyledQuestionButton
              key={index}
              question={question}
              status={seenStatus(question)}
            />
          ))} */}
        </div>
      )}
    </>
  )
}

const StyledQuestionListDisplay = styled(QuestionListDisplay)`
  button {
    font-size: 0.75rem;
    height: 3rem;
    width: 3rem;
  }
`

export default StyledQuestionListDisplay

QuestionListDisplay.propTypes = {
  availableArray: PropTypes.array,
  answeredArray: PropTypes.array,
  className: PropTypes.string,
  currentQuestion: PropTypes.object,
}

QuestionListDisplay.defaultProps = {}
