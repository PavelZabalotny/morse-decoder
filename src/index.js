const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
}

function decode(expr = '') {
  const exprToArr = expr.split('**********')
  const wordCharCount = exprToArr.map((item) => item.length / 10) // array like [5, 5]
  const exprToArrToChunk = [] // array like [['0','0','1','0','1','1','1','0','1','0',], ['0','0','1','0','1','1','1','0','1','0',]]
  /**
   * Slice on chunk for 10 elements
   */
  const chunkSize = 10
  exprToArr.forEach((item) => {
    const itemToArr = item.split('')
    for (let i = 0; i < itemToArr.length; i += chunkSize) {
      exprToArrToChunk.push(itemToArr.slice(i, i + chunkSize))
    }
  })
  /**
   * Convertation array to Morse table where one array morse element = one letter
   * newArr = [['.','-','.',],['-','-','-',]]
   */
  const newArr = exprToArrToChunk.map(
    (item) =>
      item
        .join('')
        .replace(/^0+/, '') // delete all '0' at the beginning of the string
        .match(/..?/g) // split the string into an array of two elements
        ?.map((item) => (item === '10' ? '.' : '-')) // convertation each array element like '10' ('11') to '.' or '-'
  )
  /**
   * Join each array element
   */
  const newArrToMorse = newArr.map((i) => i.join(''))
  /**
   * Convertation each morse element to one letter
   */
  const morseToChar = newArrToMorse.map((item) => MORSE_TABLE[item])
  /**
   * Split array of letter to array of word where each word = ['h', 'e', 'l', 'l', 'o']
   */
  const morseToCharWithSpaces = [] // [['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]
  let startCount = 0
  let endCount = 0
  wordCharCount.forEach((item) => {
    endCount += item
    const word = morseToChar.slice(startCount, endCount)
    morseToCharWithSpaces.push(word)
    startCount += item
  })
  /**
   * Convertation array of letters to array of words
   */
  const result = morseToCharWithSpaces.map((item) => item.join('')).join(' ')
  /**
   * Return final result as a string like 'hello world'
   */
  return result
}

module.exports = {
  decode,
}
