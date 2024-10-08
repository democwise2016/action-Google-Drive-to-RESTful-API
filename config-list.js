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
  {
    title: '製作中文投影片的希希助教 public',
    feedID: 'slide-chinese-public',
    feedURL: 'https://drive.google.com/drive/folders/12GRclYH4V1eETAupZmia0NumQf8UlV-K?usp=sharing',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
  {
    title: '翻譯成英文的希希助教 public',
    feedID: 'trans-to-english-public',
    feedURL: 'https://drive.google.com/drive/folders/1wOiJnffGxrMmZ0kd9AhdgCaPgqiDAgNq?usp=drive_link',
    itemFilters: [
      ItemFilters['gdrive'].ItemFilterGoogleDriveFolder,
    ],
  },
  {
    title: '購物評價 public',
    feedID: 'shopping-comment-public',
    feedURL: 'https://drive.google.com/drive/folders/1K3CArAip8fdBlr-siizKdNGq7wKNWQj_?usp=drive_link',
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
