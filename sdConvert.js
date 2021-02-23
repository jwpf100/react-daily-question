const mdDocumentPath =
  'https://raw.githubusercontent.com/jwpf100/reactjs-interview-questions/master/README.md'

const getMdDocument = async () => {
  await fetch(mdDocumentPath)
    .then(response => {
      response.text()
    })
    .then(data => {
      console.log('Data - ')
      console.log(data)
      // setContent(data)
    })
}

getMdDocument()

const showdown = require('showdown')

const converter = new showdown.Converter()

converter.setFlavor('github')

const text = `
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

  ### Table of Contents 2

  `

const html = converter.makeHtml(text)

// console.log(html)
