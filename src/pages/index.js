import * as React from 'react'
import Question from '../components/Question'

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}

// markup
const IndexPage = () => (
  <main style={pageStyles}>
    <title>Home Page</title>
    <Question />
  </main>
)

export default IndexPage
