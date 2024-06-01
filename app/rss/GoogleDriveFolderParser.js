const GetHTML = require('./../lib/GetHTML.js');
const StringSliceBetween = require('./../lib/StringSliceBetween.js');
const extractGoogleFileID = require('./gdrive/extractGoogleFileID.js')

const initDataCallbackParser = require('./gdrive/initDataCallbackParser.js')

// ?const cheerio = require('cheerio')

// const regex = /https:\/\/drive\.google\.com\/file\/d\/.*?\/view\?usp\\u003ddrive_web/g;
const regexSheet = /https:\/\/docs\.google\.com\/spreadsheets\/d\/.*?\/edit\?usp\\u003ddrive_web/g;
const regexDoc = /https:\/\/docs\.google\.com\/document\/d\/.*?\/edit\?usp\\u003ddrive_web/g;
const regexPresentation = /https:\/\/docs\.google\.com\/presentation\/d\/.*?\/edit\?usp\\u003ddrive_web/g;
const regexFile = /https:\/\/drive\.google\.com\/file\/d\/.*?\/view\?usp\\u003ddrive_web/g;

function parsingDataJSON(data, regex, type) {
  let matches = data.match(regex);
  if (!matches) {
    return []
  }
  matches = [...new Set(matches)]
  let result = []
  matches.map(link => {
    // if (excludeIDList.length > 0) {
    //   let id = extractGoogleFileID(link)
    //   if (excludeIDList.indexOf(id) > -1) {
    //     return false
    //   }
    // }
      

    result.push({
      type,
      link: link.replace("\\u003d", "=")
    })
  })
  return result
}

module.exports = async function (url) {
  let body = await GetHTML(url, {
    cacheDay: 0.0001
  })

  let initDataCallback = StringSliceBetween(body, `AF_initDataCallback({key: 'ds:4', hash: '6',`, `, sideChannel: {}});`)
  // let dataJSON
  // try {
  //   initDataCallback = initDataCallback.slice(5)
  //   eval(`dataJSON = ${initDataCallback}`)
  // } catch (e) {
  //   console.log(e)
  // }

  // let result = extractFileInfo(dataJSON)
  // console.log({result})

  // I have a json in the file. I want to extract the following information:
  // [
  //   {
  //     "filename": "pulipulichen-github-project-readme",
  //     "link": "https://docs.google.com/spreadsheets/d/1hSyLB44moL7BRZaLQaOLCzLHfTsLyQ-rTnXRvJujxTA/edit?usp=sharing"
  //   },
  //   {
  //     "filename": "ttest",
  //     "link": "https://docs.google.com/spreadsheets/d/1yyB8xSUeL_J04LxUK6nRarUnhm7OxBOdtw9be20ERfY/edit?usp=sharing"
  //   }
  // ]

  // console.log(initDataCallback);
  // let matchesSheet = initDataCallback.match(regexSheet);
  
  // matchesSheet = matchesSheet.map(link => link.replace("\\u003d", "="))
  // matchesSheet = [...new Set(matchesSheet)]
  // console.log({matchesSheet})
  // let $ = cheerio.load(body);

  // let dataIDList = []
  // $('c-wiz div[data-id]').each((element) => {
  //   dataIDList.push($(element).attr('data-id'))
  // })

  let items = []
  items = items.concat(parsingDataJSON(initDataCallback, regexSheet, 'spreadsheet'))
  items = items.concat(parsingDataJSON(initDataCallback, regexDoc, 'document'))
  items = items.concat(parsingDataJSON(initDataCallback, regexPresentation, 'presentation'))

  // console.log(items)

  // let excludeIDList = items.map(item => {
  //   let id = extractGoogleFileID(item.link)
  //   return id
  // })

  // console.log(excludeIDList)

  items = items.concat(initDataCallbackParser(initDataCallback, 'text/html', 'html'))

  // console.log(items);

  // console.log(items); 
  // throw new Error('stop')

  return {
    items
  }
}