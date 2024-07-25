const fs = require('fs')

const csv = require('csv-parser');

function csvToHtml(csvFilePath, title, outputPath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results)

        // Generate HTML content
        let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
        html += `<meta charset="UTF-8">\n`;
        html += `  <title>${title}</title>\n`;
        html += '</head>\n<body>\n';
        html += `<h1>${title}</h1>\n`;
        html += '<table border="1">\n';

        // Add table headers
        if (results[0]) {
          html += '  <tr>\n';
          Object.keys(results[0]).forEach(header => {
            html += `    <th>${header.split('\n').join('<br />')}</th>\n`;
          });
          html += '  </tr>\n';
        }
          

        // Add data rows
        results.forEach(row => {
          html += '  <tr>\n';
          Object.values(row).forEach(cell => {
            html += `    <td>${cell.split('\n').join('<br />')}</td>\n`;
          });
          html += '  </tr>\n';
        });

        html += '</table>\n';
        html += '</body>\n</html>';

        // Write HTML to the specified output path
        fs.writeFile(outputPath, html, 'utf8', err => {
          if (err) {
            console.error('Error writing the HTML file:', err);
            reject(err)
            return;
          }
          console.log('HTML file has been generated successfully:', outputPath);
          resolve(outputPath)
        });
      });
  })
    
}

module.exports = csvToHtml