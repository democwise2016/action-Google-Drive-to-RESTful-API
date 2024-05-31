const cheerio = require('cheerio');

function removeAttributes(html, attributes = [
  'class', 'id', 'style', 'width', 'height', 'data-original', 'decoding', 'loading', 'srcset', 'sizes', 
  'data-lazy-srcset', 'data-large-file', 'data-image-description', 'data-image-caption', 'data-medium-file', 'data-image-meta', 'data-comments-opened', 'data-orig-size',
  'data-attachment-id', 'data-permalink', 'data-orig-file', 'srcset', 'rel',
  'data-src', 'data-srcset', 'data-sizes', 'referrerpolicy',
  'data-image-title', 'ezimgfmt', 'importance', 'data-id', 'data-type',
  'data-ezsrcset', 'data-ezsrc', 'data-query',
  'data-crop-orig-src', 'data-uuid', 'data-img-url', 'data-img-desc', 'data-img-caption', 'data-modal-container-id', 'data-modal-id',
  'data-normal', 'onerror', 'data-pin-media',
  'data-placeholder-url', 'data-merchant-network', 'data-merchant-url', 'data-hl-processed', 'data-url', 'data-hydrate'
]) {
  const $ = cheerio.load(html);

  attributes.forEach((attr) => {
    $(`[${attr}]`).removeAttr(attr);  
  })

  $(`style`).remove()
  $(`script`).remove()
  $(`link`).remove()
  $(`noscript`).remove()

  $('*').contents().each(function () {
    if (this.type === 'comment') {
      $(this).remove();
    }
  });

  $('image-group,figure,picture').each(function () {
    const $this = $(this);
    $this.replaceWith($this.html());
  });

  $('picture').each(function () {
    const $this = $(this);
    $this.replaceWith($this.html());
  });

  $('source').each(function () {
    const $this = $(this);
    $this.replaceWith($this.html());
  });

  $('li > div').each(function () {
    const $this = $(this);
    $this.replaceWith($this.html());
  });

  // --------------------------

  let htmlOutput = $('body').html().trim()

  htmlOutput = htmlOutput.split('\n').map(line => line.trim()).join('\n')

  let removeLeadingList = [
    '<p>&nbsp;</p>',
    '<br>',
    '<div>\n</div>'
  ]

  removeLeadingList.forEach(keyword => {
    while (htmlOutput.endsWith(keyword)) {
      htmlOutput = htmlOutput.slice(0, keyword.length * -1).trim()
    }
  })

  while (htmlOutput.indexOf('\n\n') > -1) {
    htmlOutput = htmlOutput.split('\n\n').join('\n').trim()
  }

  let removeKeywordList = [
    '<p>&nbsp;</p>',
    '<p><strong><span>–</span></strong></p>',
    '<span></span>',
    '<p></p>',
    '<div aria-hidden="true"></div>',
    '<div></div>',
    '<h2>&nbsp;</h2>',
    '<center>\n</center>',
    '<h2>\n</h2>',
    '<div>\n</div>',
    '<div> <div>',
    '<div align="center">\n</div>',
    '<p>\n</p>',
    `<div>
</div>`,
    '<p>###</p>',
    ' alt=""',
    ' title=""'
  ]
  
  removeKeywordList.forEach(keyword => {
    while (htmlOutput.indexOf(keyword) > -1) {
      htmlOutput = htmlOutput.split(keyword).join('').trim()
    }
  })

  // console.log(htmlOutput.slice(0, 10))

  while (htmlOutput.indexOf('\n\n') > -1) {
    htmlOutput = htmlOutput.split('\n\n').join('\n').trim()
  }
  

  // if (htmlOutput.endsWith('"')) {
  //   htmlOutput = htmlOutput.slice(0, -1)
  // }

  return htmlOutput
}

module.exports = removeAttributes