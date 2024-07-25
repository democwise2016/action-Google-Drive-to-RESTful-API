
const csv = require('csv-parser');
const fs = require('fs')



function csvToTxt(csvFilePath, outputPath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          let output = results.map(item => {
            return Object.keys(item).map((key) => {
              return `${key}: ${item[key]}` 
            }).join('\n')
          }).join('\n\n####\n\n')

          await fs.promises.writeFile(outputPath, output);
          

          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
  });
    
}

module.exports = csvToTxt