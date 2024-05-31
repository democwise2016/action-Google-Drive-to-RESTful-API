const axios = require('axios');

async function fetchFacebookPostHTML(postUrl, referer = 'https://www.facebook.com/') {
  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(postUrl, {
        headers: {
          Referer: referer
        }
      });

      // console.log(response.data);
      resolve(response.data)
    } catch (error) {
      reject('Error:' + error.message)
      return null;
    }
  })
}

// const postUrl = 'https://www.facebook.com/688545416608266/posts/780353607427446';
// const referer = 'https://www.facebook.com/';

// fetchFacebookPostHTML(postUrl, referer)
//   .then(html => {
//     if (html) {
//       console.log('Fetched HTML:', html);
//     } else {
//       console.log('Failed to fetch HTML.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });

module.exports = fetchFacebookPostHTML