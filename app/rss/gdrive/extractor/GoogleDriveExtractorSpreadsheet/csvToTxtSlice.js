
const csv = require('csv-parser');
const fs = require('fs')
const path = require('path')

function splitArrayIntoChunks(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function csvToTxtSlice(csvFilePath, feedFolder, id) {

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          let filenames = []
          let chunks = splitArrayIntoChunks(results, 100)

          for (let idx = 0; idx < chunks.length; idx++) {
            let output = results.map(item => {
              return Object.keys(item).map((key) => {
                return `${key}: ${item[key]}` 
              }).join('\n')
            }).join('\n\n####\n\n')

            const txtFilePath = path.join(feedFolder, `${id}_${idx}.txt`);
            await fs.promises.writeFile(txtFilePath, output);
            filenames.push(path.basename(txtFilePath))
          }

          resolve(filenames);
        } catch (err) {
          reject(err);
        }
      });
  });
    
}

module.exports = csvToTxtSlice