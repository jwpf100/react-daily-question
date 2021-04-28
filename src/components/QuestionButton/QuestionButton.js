import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const QuestionButton = ({ question, className, status }) => {
  let seenNotSeen = 'btn-secondary'
  switch (status) {
    case 'current':
      seenNotSeen = 'btn-primary'
      break
    case 'seen':
      seenNotSeen = 'btn-success'
      break
    default:
      seenNotSeen = 'btn-secondary'
  }

  return (
    <>
      <button
        type="button"
        className={['btn rounded-circle m-1', seenNotSeen, className].join(' ')}
      >
        {question.number}
      </button>
    </>
  )
}

const StyledQuestionButton = styled(QuestionButton)`
  button {
    font-size: 0.75rem;
    height: 3rem;
    width: 3rem;
  }
`

export default StyledQuestionButton

QuestionButton.propTypes = {
  question: PropTypes.object,
  className: PropTypes.string,
  status: PropTypes.string,
}

QuestionButton.defaultProps = {}
