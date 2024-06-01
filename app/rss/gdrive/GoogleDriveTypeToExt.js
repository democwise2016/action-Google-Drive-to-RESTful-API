const ext = {
  'document': 'html',
  'spreadsheet': 'html',
  'presentation': 'html',
  'html': 'html',
  'pdf': 'pdf'
}

module.exports = function (type) {
  // console.log(type, ext[type])
  return ext[type]
}