const remark = require('remark')
const find = require('unist-util-find')

remark()
  .use(() => {
    // eslint-disable-next-line no-use-before-define
    return transformer

    function transformer(tree) {
      const node = find(tree, { type: 'emphasis' })
      console.log(node)
    }
  })
  .processSync('Some _emphasis_, **strongness**, _more emphasis_, and `code`.')

remark()

const fs = require('fs')
const unified = require('unified')
const markdown = require('remark-parse')
const html = require('remark-html')
const gfm = require('remark-gfm')

const markdown2 = `
  # React Interview Questions & Answers

  > Click :star:if you like the project. Pull Request are highly appreciated. Follow me [@SudheerJonna](https://twitter.com/SudheerJonna) for technical updates.
  
  ---
  
  <div align="center">
      <p>
          <a href="https://www.fullstack.cafe/?utm_source=github&utm_medium=sud">
              <b>Having Tech Interview?</b>
              <br> 3600 Tech Interview Questions. <b>Answered</b>.
              <br>
              <div>
                  <img src="https://user-images.githubusercontent.com/13550565/76382460-cc784d80-6393-11ea-8837-2b89265ac853.png" width="260" alt="FullStack.Cafe">
              </div>
          </a>
          <sub><i>Proudly supporting React Interview Questions</i></sub>
      </p>
  </div>
  
  ---
  
  ## Downloading PDF/Epub formats
  
  You can download the PDF and Epub version of this repository from the latest run on the [actions tab](https://github.com/sudheerj/reactjs-interview-questions/actions).
  
  ### Table of Contents
  
  | No. | Questions |
  | --- | --------- |
  |   | **Core React** |
  |1  | [What is React?](#what-is-react) |
  |2  | [What are the major features of React?](#what-are-the-major-features-of-react) |
  |3  | [What is JSX?](#what-is-jsx) |
  |4  | [What is the difference between Element and Component?](#what-is-the-difference-between-element-and-component) |
  |5  | [How to create components in React?](#how-to-create-components-in-react) |
  |6  | [When to use a Class Component over a Function Component?](#when-to-use-a-class-component-over-a-function-component) |
  |7  | [What are Pure Components?](#what-are-pure-components) |
  |8  | [What is state in React?](#what-is-state-in-react) |
  |9  | [What are props in React?](#what-are-props-in-react) |
  |10 | [What is the difference between state and props?](#what-is-the-difference-between-state-and-props) |
  |11 | [Why should we not update the state directly?](#why-should-we-not-update-the-state-directly) |
  7. ### What are Pure Components?
  `

unified()
  .use(markdown)
  .use(gfm)
  .use(html)
  .process(markdown2, (err, file) => {
    if (err) throw err
    console.log(String(file))
  })
