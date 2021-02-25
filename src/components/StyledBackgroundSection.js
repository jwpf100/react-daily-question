import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'
import StyledOverlayDiv from './StyledOverlayDiv'

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "background-react-question.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          critical
          fadeIn={false}
        >
          <StyledOverlayDiv />
        </BackgroundImage>
      )
    }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  height: 100vh;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledBackgroundSection

BackgroundSection.propTypes = {
  className: PropTypes.string,
}
