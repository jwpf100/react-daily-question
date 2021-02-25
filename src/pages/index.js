import * as React from 'react'

import BackgroundImage from 'gatsby-background-image'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import StyledBackgroundSection from '../components/StyledBackgroundSection'
import Layout from '../components/layout'
import '../css/background-image.css'

import SEO from '../components/seo'

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}

// markup
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {/* <BackgroundImage
      className="masthead"
      fluid={data.indexImage.childImageSharp.fluid}
      fadeIn={false}
      critical
    >
      <div className="black-overlay">
        <div className="content-box">
          <h1>This is a test</h1>
        </div>
      </div>
    </BackgroundImage> */}
    <StyledBackgroundSection />
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    indexImage: file(relativePath: { eq: "background-react-question.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}
