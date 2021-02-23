// remove pre ###table of contents
// Create random number
// match and index number + . + space + ###
// match and index number(n+1) + . + space + ###
// Take string

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const Questions = () => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [questionNo, setQuestionNo] = useState(0)
  const [questionHeader, setQuestionHeader] = useState('')
  const [questionMain, setQuestionMain] = useState('')

  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

  const searchForQuestionNo = () => {
    const searchTerm = questionNo.toString()
    const indexOfSearch = content.indexOf(searchTerm) - 1
    const indexOfEndSearch = content.lastIndexOf(searchTerm)
    console.log(
      `Index of ${searchTerm} starts at ${indexOfSearch} and ends at ${indexOfEndSearch}`
    )
    const searchResult = content.substring(
      indexOfSearch,
      indexOfSearch + searchTerm.length
    )
    console.log(searchResult)
    const indexOfEndOfQuestionHeader = content.indexOf(')', indexOfSearch) + 1
    console.log(
      `Index of ${searchTerm} starts at ${indexOfSearch} and ends at ${indexOfEndOfQuestionHeader}`
    )
    const searchResultNew = content.substring(
      indexOfSearch,
      indexOfEndOfQuestionHeader
    )
    console.log(searchResultNew)
    setQuestionHeader(searchResultNew)
  }

  const searchForQuestionHeader = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = content.indexOf(searchTerm)
    const indexOfEndSearch = content.indexOf(`?`, indexOfSearch) + 1
    const searchResult = content.substring(indexOfSearch, indexOfEndSearch)
    setQuestionMain(searchResult)
  }

  const searchForQuestionMain = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = content.indexOf(searchTerm)
    const indexOfEndSearch = content.indexOf(
      `**[⬆ Back to Top](#table-of-contents)**`,
      indexOfSearch
    )
    const searchResult = content.substring(indexOfSearch, indexOfEndSearch)
    setQuestionMain(searchResult)
  }

  // Formula to set a question number that will be displayed.  Used when page loads and again via a button.
  const generateQuestionNumber = () => {
    const maxQuestionNo = 300 // 329+1
    setQuestionNo(Math.floor(Math.random() * maxQuestionNo + 1))
    // setQuestionNo(9)
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(mdDocumentPath).then(response =>
        response.text()
      )
      setContent(result)
      setIsLoading(false)
      generateQuestionNumber()
    }
    fetchData()
  }, [])

  return (
    // <div>{!isLoading ? <Markdown children={content} /> : <h1>Loading</h1>}</div>
    <div>
      {!isLoading ? (
        <>
          <h1>Loaded</h1>
          <h2>Question: {questionNo}</h2>
          <button type="button" onClick={searchForQuestionHeader}>
            Question
          </button>
          <button type="button" onClick={searchForQuestionMain}>
            Answer
          </button>
          <ReactMarkdown
            plugins={[[gfm, { singleTilde: false }]]}
            source={questionMain}
          />
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>

    // <div>{!isLoading ? <div>Loaded</div> : <h1>Loading</h1>}</div>
  )
}

export default Questions
