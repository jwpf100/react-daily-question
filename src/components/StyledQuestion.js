import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Question from './Question'

const QuestionDiv = ({ className }) => (
  <div className={className}>
    <div className="content-box">
      <h2>React Question of the Day!</h2>
      <Question />
    </div>
  </div>
)

const StyledQuestionDiv = styled(QuestionDiv)`
  background-color: rgba(0, 0, 0, 0.2);
`

export default StyledQuestionDiv

QuestionDiv.propTypes = {
  className: PropTypes.string,
}
