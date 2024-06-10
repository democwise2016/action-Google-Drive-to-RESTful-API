const ItemFilters = require('./app/config/ItemFilters.js')

let feedList = [
  {
    title: 'action-Google-Drive-to-RESTful-API',
    feedID: 'action-Google-Drive-to-RESTful-API',
    feedURL: 'https://drive.google.com/drive/folders/1ORpMi_iRR4jxHqfWtwhVfcCFp9ID9EOH?usp=drive_link',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
  {
    title: 'pulipulichen-github-public',
    feedID: 'pulipulichen-github-public',
    feedURL: 'https://drive.google.com/drive/folders/12N24RMeQ3bS30_veANE5WP216z3KCLqL',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
  {
    title: '修改論文的希希助教 public',
    feedID: 'paper-revising-public',
    feedURL: 'https://drive.google.com/drive/folders/1P3dbQ-CHNCvHAhQPZO61aWxe4ID4ilcC?usp=drive_link',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
  {
    title: '規劃演講標題的希希助教 public',
    feedID: 'speech-titling-public',
    feedURL: 'https://drive.google.com/drive/folders/1k7Wrc5yx6JRgCDnihRvZgP0Llc-qc_HU?usp=drive_link',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
]
// ----------------------------------------------------------------

// feedList = [
//   { // <outline type="rss" text="學不完．教不停．用不盡 :: 痞客邦 PIXNET ::" title="學不完．教不停．用不盡 :: 痞客邦 PIXNET ::" xmlUrl="http://feeds.feedburner.com/pixnetisvincent"/>
//     title: '公視新聞網',
//     feedID: 'pts-news',
//     feedURL: 'https://news.pts.org.tw/xml/newsfeed.xml',
//     itemFilters: [
//       ItemFilters['sites'].ItemFilterBlog,
//       ItemFilters['sites'].ItemFilterPTSNews,
//     ],
//     options: {
//       selector: 'body > article',
//       proxy: true,
//     }
//   },
// ]

module.exports = feedList
