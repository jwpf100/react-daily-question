/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import marked from 'marked'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const showdown = require('showdown')

const convertHTML = text => {
  const converter = new showdown.Converter()
  converter.setFlavor('github')
  const html = converter.makeHtml(text)
  // console.log('html')
  // console.log(html)
}

const mdDocumentPath =
  'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

const Questions = () => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const getMdDocument = async () => {
    await fetch(mdDocumentPath)
      .then(response => response.text())
      .then(body => {
        console.log(body)
        setContent(body)
        setIsLoading(false)
      })
  }

  const getMarkdownText = () => {
    const rawMarkup = marked('This is _Markdown_.', { sanitize: true })
    return { __html: rawMarkup }
  }

  useEffect(() => {
    /*    fetch(mdDocument)
      .then(res => res.text())
      .then(md => {
        setContent(md)
      })
*/
    getMdDocument()
    convertHTML(content)
  })

  return (
    // <div>{!isLoading ? <Markdown children={content} /> : <h1>Loading</h1>}</div>
    <div>
      {!isLoading ? (
        <ReactMarkdown
          plugins={[[gfm, { singleTilde: false }]]}
          source={content}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </div>

    // <div>{!isLoading ? <div>Loaded</div> : <h1>Loading</h1>}</div>
  )
}

export default Questions
