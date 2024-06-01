
const fs = require('fs')
const path = require('path')

const extractGoogleFileID = require('./extractGoogleFileID.js')
const GoogleDriveTypeToExt = require('./GoogleDriveTypeToExt.js')

const CONFIG = require('../../../config.js')

function buildHTML(title, links, feedID) {
  let linksHTML = links.map((link) => {
    return `<p>
      <button type="button" onclick="copyPlainString('${link}'); this.style.color ='red'">COPY</button>
      <a href="${link}" target="_blank">${link}</a>
    </p>`
  })

  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <style>
    p button { font-size: 3rem;}
    </style>
    <script>
    function copyPlainString (text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
      }, function (err) {
      });
    }

    function fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
  
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
  
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
  
      document.body.removeChild(textArea);
    }
    </script>
  </head>
  <body>
    <h1>${title}</h1>
    ${linksHTML.join('\n')}
  </body>
  </html>`

  fs.writeFileSync(path.join(__dirname, `../../../output/${feedID}.html`), html, 'utf-8')
}

module.exports = function (feedJSON) {
  let {title, feedID, items} = feedJSON

  let links = []

  if (items) {
    links = items.map(item => {

      let ext = GoogleDriveTypeToExt(item.type)
      let id = extractGoogleFileID(item.link)

      return `${CONFIG.publicURL}${feedID}/${id}.${ext}`
    })
  }
    

  buildHTML(title, links, feedID)
}