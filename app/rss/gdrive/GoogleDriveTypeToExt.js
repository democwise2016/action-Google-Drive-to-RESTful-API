const ext = {
  'document': 'html',
  'spreadsheet': 'json',
  'presentation': 'json'
}

module.exports = function (type) {
  console.log(type, ext[type])
  return ext[type]
}