/* eslint-disable no-nested-ternary */
// 1
/* Iterate through md file and determine max number */

// Find question 1

const setSearchTerm = number => {
  const searchTerm =
    number < 10
      ? `|${number.toString()}  |`
      : number < 100
      ? `|${number.toString()} |`
      : `|${number.toString()}|`
  return searchTerm
}

const searchMaxNumber = mdSource => {
  const indexOfQ1 = mdSource.indexOf(setSearchTerm(1))
  let maxNumber = 0
  for (let i = 2; ; i += 1) {
    const searchNumber = setSearchTerm(i)
    const searchNumberPlusOne = setSearchTerm(i + 1)
    const searchNumberPlusTwo = setSearchTerm(i + 2)
    const searchNumberPlusThree = setSearchTerm(i + 3)
    if (mdSource.indexOf(searchNumber, indexOfQ1) === -1) {
      if (
        // Check that there aren't just gaps in the numbers, assuming that if the next three search terms return nothing then it's the end of the list
        mdSource.indexOf(searchNumberPlusOne, indexOfQ1) === -1 &&
        mdSource.indexOf(searchNumberPlusTwo, indexOfQ1) === -1 &&
        mdSource.indexOf(searchNumberPlusThree, indexOfQ1) === -1
      ) {
        return maxNumber
      }
    }
    maxNumber = i
  }
}

// 2
/* Create an array from MDData in the format:
  [{1, 'What is React?'}, {2, What are the major features of React?}]
*/

const createQuestionArray = mdSource => {
  const maxQuestion = parseInt(searchMaxNumber(mdSource), 10)
  const startOfQuestions = mdSource.indexOf(setSearchTerm(1))
  const questionArray = []
  for (let i = 1; i < maxQuestion + 1; i += 1) {
    const searchTerm = setSearchTerm(i)
    // Location of question start point (search term)
    const searchStartIndex = mdSource.indexOf(searchTerm) + searchTerm.length

    // Check to see if the search term exists.  If it doesn't then it must have a lower index than the 1st question in the MD Doc (the search will return -1 + the length of the search)

    if (searchStartIndex > startOfQuestions) {
      // Location of first bracket in question
      const questionStartPoint = mdSource.indexOf('[', searchStartIndex)

      // Find closing bracket.  Use counter to ensure that there aren't brackets within the brackets I want to find. E.g.  [This is a question with brackets [inside] which wouldn't work if I just searched for the first closing bracket]

      let counter = 0
      let questionEndPoint = 0
      let j = questionStartPoint - 1
      do {
        j += 1
        switch (mdSource[j]) {
          case '[':
            counter += 1
            break
          case ']':
            counter -= 1
            break
          default:
        }
        questionEndPoint = j
      } while (counter !== 0)

      // Define the question using the start (questionStartPoint) and end (questionEndPoint) points

      const question = mdSource.slice(questionStartPoint + 1, questionEndPoint)

      // Create the array

      questionArray.push({ number: i, question })
    }
  }
  return questionArray
}

export { createQuestionArray, searchMaxNumber }
