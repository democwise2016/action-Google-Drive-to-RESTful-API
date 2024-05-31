module.exports = function (url) {
  const regex = /https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[2] : null;
}