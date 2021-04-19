/* eslint-disable no-nested-ternary */
// 1
/* Iterate through md file and determine max number */

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

export { searchMaxNumber }
