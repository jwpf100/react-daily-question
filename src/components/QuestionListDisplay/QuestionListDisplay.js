import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StyledQuestionButton from '../QuestionButton/QuestionButton'

const QuestionListDisplay = ({ questionArray, answeredArray, className }) => (
  <>
    {questionArray.length < 2 ? (
      <div>Loading</div>
    ) : (
      <div className={['d-flex flex-wrap', className].join(' ')}>
        <h3 className="w-100 text-center">Questions</h3>
        {/* Map through full question list.  If the question is also in the answeredArray turn it green. */}
        {questionArray.map((newQuestion, index) => {
          if (
            answeredArray.find(
              ({ question }) => question === newQuestion.question
            )
          ) {
            return (
              <StyledQuestionButton key={index} question={newQuestion} seen />
            )
          }
          return <StyledQuestionButton key={index} question={newQuestion} />
        })}
      </div>
    )}
  </>
)

const StyledQuestionListDisplay = styled(QuestionListDisplay)`
  button {
    font-size: 0.75rem;
    height: 3rem;
    width: 3rem;
  }
`

export default StyledQuestionListDisplay

QuestionListDisplay.propTypes = {
  questionArray: PropTypes.array,
  answeredArray: PropTypes.array,
  className: PropTypes.string,
}

QuestionListDisplay.defaultProps = {}
