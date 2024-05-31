const containsChineseCharacters = require('./containsChineseCharacters')

function endsWithList(str, suffixList) {
  for (let i = 0; i < suffixList.length; i++) {
    if (str.endsWith(suffixList[i])) {
      return true;
    }
  }
  return false
}

function SentenceAppendPeriod(sentence) {
  if (endsWithList(sentence, ['.', ';', '?', '!', '"', "'", '，', '、', '&', '@', '。', '！', '？']) === false) {
    if (containsChineseCharacters(sentence)) {
      sentence += '。'
    }  
    else {
      sentence += '.'
    }
  }

  if (containsChineseCharacters(sentence) === false) {
    sentence += ' '
  }
  
  return sentence
}


module.exports = SentenceAppendPeriod
