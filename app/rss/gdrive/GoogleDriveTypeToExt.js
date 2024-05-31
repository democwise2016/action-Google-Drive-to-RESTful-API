const ext = {
  'document': 'html',
  'spreadsheet': 'json',
  'presentation': 'html'
}

module.exports = function (type) {
  // console.log(type, ext[type])
  return ext[type]
}