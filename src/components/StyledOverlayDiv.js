import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Question from './Question'

const OverlayDiv = ({ className }) => (
  <div className={className}>
    <div className="content-box">
      <h2>React Question of the Day!</h2>
      <Question />
    </div>
  </div>
)

const StyledOverlayDiv = styled(OverlayDiv)`
  display: -webkit-flex; /*  safari */
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  align-items: center;
  color: white;
`

export default StyledOverlayDiv

OverlayDiv.propTypes = {
  className: PropTypes.string,
}
