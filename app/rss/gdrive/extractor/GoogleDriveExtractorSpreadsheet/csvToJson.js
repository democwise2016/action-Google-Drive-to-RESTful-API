
const csv = require('csv-parser');
const fs = require('fs')

function csvToJson(csvFilePath, jsonFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await fs.promises.writeFile(jsonFilePath, JSON.stringify(results, null, 2));
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
  });
}

module.exports = csvToJson