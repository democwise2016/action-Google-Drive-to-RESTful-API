const fs = require('fs');

module.exports = function (filePath, title) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
  
    // Check if <head> tag exists
    const headTagIndex = data.indexOf('<head>');
    if (headTagIndex === -1) {
      console.error('No <head> tag found in the HTML file.');
      return;
    }
  
    // Insert the <title> tag after <head>
    const modifiedData = data.slice(0, headTagIndex + 6) + `\n<title>${title}</title>\n` + data.slice(headTagIndex + 6);
  
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      // console.log('Successfully inserted <title>HOMEPAGE</title> into the HTML file.');
    });
  });
}