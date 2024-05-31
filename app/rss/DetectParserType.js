module.exports = function (url) {
  let type = 'rss'

  if (url.startsWith('https://drive.google.com/drive/folders/')) {
    return 'gdrive'
  }

  return type
}