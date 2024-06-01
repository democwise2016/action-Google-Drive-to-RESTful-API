module.exports = function (url) {
  // const regex = /https:\/\/(drive)\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9-_]+)/;
  // const match = url.match(regex);
  // return match ? match[2] : null;

  // https://drive.google.com/file/d/1u79ebOENe_SKR-agEILn6U7G704CN8xP/view
  let parts = url.split('/')
  return parts[parts.indexOf('d') + 1]
}