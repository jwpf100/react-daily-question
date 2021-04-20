import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const OverlayDiv = ({ children, className }) => (
  <div className={className}>{children}</div>
)

const StyledOverlayDiv = styled(OverlayDiv)`
  display: -webkit-flex; /*  safari */
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  align-items: center;
  color: white;
`

export default StyledOverlayDiv

OverlayDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
}
