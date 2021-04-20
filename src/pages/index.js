import * as React from 'react'

import { graphql } from 'gatsby'
import StyledBackgroundSection from '../components/StyledBackgroundSection'
import StyledOverlayDiv from '../components/StyledOverlayDiv'
import Layout from '../components/layout'
import Question from '../components/Question'
import StyledQuestion from '../components/StyledQuestion'
import '../css/background-image.css'

import SEO from '../components/seo'

// markup
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StyledOverlayDiv className="bg-overlay">
      <StyledQuestion className="container" />
    </StyledOverlayDiv>
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

IndexPage.propTypes = {}
