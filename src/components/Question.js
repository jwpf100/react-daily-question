import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const Questions = () => {
  const [MdFile, setMdFile] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [questionNo, setQuestionNo] = useState(0)
  const [questionMain, setQuestionMain] = useState('')

  const mdDocumentPath =
    'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

  const searchForQuestionHeader = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = MdFile.indexOf(searchTerm)
    const indexOfEndSearch = MdFile.indexOf(`?`, indexOfSearch) + 1
    const searchResult = MdFile.substring(indexOfSearch, indexOfEndSearch)
    setQuestionMain(searchResult)
  }

  const searchForQuestionMain = () => {
    const searchTerm = `${questionNo.toString()}. ###`
    const indexOfSearch = MdFile.indexOf(searchTerm)
    const indexOfEndSearch = MdFile.indexOf(
      `**[⬆ Back to Top](#table-of-contents)**`,
      indexOfSearch
    )
    const searchResult = MdFile.substring(indexOfSearch, indexOfEndSearch)
    setQuestionMain(searchResult)
  }

  // Formula to set a question number that will be displayed.  Used when page loads and again via a button.
  const generateQuestionNumber = () => {
    const maxQuestionNo = 300 // 329+1
    setQuestionNo(Math.floor(Math.random() * maxQuestionNo + 1))
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(mdDocumentPath).then(response =>
        response.text()
      )
      setMdFile(result)
      setIsLoading(false)
      generateQuestionNumber()
    }
    fetchData()
  }, [])

  return (
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
  )
}

export default Questions
