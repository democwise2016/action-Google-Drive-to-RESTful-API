const URL = require('url')

module.exports = function (url) {
  let queryData = URL.parse(url, true).query
  // console.log(queryData)
  if (queryData.channel_id) {
    return 'ch_' + queryData.channel_id
  }
  else if (queryData.list) {
    return 'pl_' + queryData.list
  }
  else if (queryData.playlist_id) {
    return 'pl_' + queryData.playlist_id
  }
  
  return ''
}