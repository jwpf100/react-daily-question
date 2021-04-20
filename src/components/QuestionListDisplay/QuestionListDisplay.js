import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StyledOverlayDiv from '../StyledOverlayDiv'

const QuestionListDisplay = ({ questionArray, className }) => (
  <>
    {questionArray.length < 2 ? (
      <div>Loading</div>
    ) : (
      <div className={['d-flex flex-wrap', className].join(' ')}>
        <h3 className="w-100 text-center">Questions</h3>
        {questionArray.map(question => (
          <button
            type="button"
            className="btn btn-secondary rounded-circle m-1"
            questionInfo={question}
          >
            {question.number}
          </button>
        ))}
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
  className: PropTypes.object,
}

QuestionListDisplay.defaultProps = {
  questionArray: [{ number: '1' }],
}
