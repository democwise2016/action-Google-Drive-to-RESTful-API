module.exports = function (text, header, footer) {
  if (typeof(text) !== 'string') {
    return undefined
  }
  
  let startPos = text.indexOf(header)
  if (startPos === -1) {
    return undefined
    // startPos = 0
  }
  else {
    startPos = startPos + header.length
  }
  
  let endPos = text.indexOf(footer, startPos)
  if (endPos === -1) {
    return undefined
    // endPos = text.length
  }
  
  return text.slice(startPos, endPos)
}