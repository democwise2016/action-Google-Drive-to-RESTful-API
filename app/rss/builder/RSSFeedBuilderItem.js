const CONFIG = require('./../../../config.js')

const linkifyUrls = require('linkify-urls');

let convertLinkToLinks = function(link, counts) {

  if (Array.isArray(link)) {
    return link
  }

  if (counts < 2) {
    return [link]
  }

  let header = link, footer = ''
  let paraPos = link.indexOf('?')
  let hashPos = link.indexOf('#')
  if (paraPos > -1 && hashPos === -1) {
    header = link.slice(0, paraPos) + '#list'
    footer = link.slice(paraPos)
  }
  else if (paraPos > -1 && hashPos > -1) {
    header = link.slice(0, paraPos)
    footer = link.slice(paraPos)
  }
  else if (paraPos === -1 && hashPos === -1) {
    header = link + '#list'
    footer = ''
  }
  else if (paraPos === -1 && hashPos > -1) {
    header = link
    footer = ''
  }

  let output = []
  for (let i = 0; i < counts; i++) {
    output.push(header + i + footer)
  }

  return output
}

let main = async function (options, output) {
  let channelDescription = options.link + '\n' + options.title
  if (options.title !== options.author) {
    channelDescription = channelDescription + '\n' + options.author
  }
  
  if (Array.isArray(options.items)) {
    for (let i = 0; i < options.items.length; i++) {
      let item = options.items[i]

      // -----------------

      let titles = item.title
      let contents = item.content

      if (!contents) {
        console.error('Error: Contents is empty.')
        console.log(item)
        continue
      }
      // let description = item.description
      

      if (Array.isArray(titles) === false) {
        titles = [titles.trim()]
      }
      if (Array.isArray(contents) === false) {
        contents = [contents.trim()]
      }
      let links = convertLinkToLinks(item.link, contents.length)

      // console.log(titles)
      // console.log(links)

      // -----------------
      for (let j = 0; j < links.length; j++) {
        let title = titles[j]
        let content = contents[j]
        let link = links[j]

        if (item.playlistDate) {
          item.date = item.playlistDate
        }

        if (!item.date && item.pubDate) {
          item.date = item.pubDate
        }
        
        if (!item.thumbnail) {
          // https://unsplash.it/800/800?random
          // item.thumbnail = await getRedirectedURL('https://unsplash.it/800/800?random')
        }
        
        if (!item.author) {
          item.author = options.author
        }


        // if (content && !item.description) {
        item.description = content
        // }
        
        if (!item.description) {
          item.description = `${item.title}

  ${channelDescription}`
        }
        
        if (item.description) {
          item.description = item.description.trim().split('\\n').join('\n').trim()
        }

        // ----------------------------------------------------------------

        if (item.caption) {
          item.description = `<hr style="clear:both" />
  ====

  ${item.caption}

  <hr style="clear:both" />
  ====
  ` + item.description.split('\n').map(line => `<p>${line}</p>`).join('')
        }

        // ----------------------------------------------------------------
        
        // let thumnails
        // if (Array.isArray(item.thumbnails) === true && item.thumbnails.length > 0) {
        //   thumnails = item.thumbnails.map((url, i) => {
        //     if (i === 0) {
        //       return `<p><a href="${item.link}"><img src="${url}" /></a></p><br /><p style="clear: both">`
        //     }
        //     return `<a href="${item.link}"><img src="${url}" /></a>`
        //   }).join('')
        //   if (item.link) {
        //     thumnails = `${thumnails}</p>`
        //   }
        // }
        
        // let subtitles
        // if (Array.isArray(item.subtitles) === true && item.subtitles.length > 0) {
        //   subtitles = item.subtitles.map(({title, url}) => {
        //     return `<a href="${url}">${title}</a>`
        //   })
        // }
        
        // if (!item.mediaURL && item.audioURL) {
        //   item.mediaURL = item.audioURL
        // }
        
        // if (!item.MIMEType && item.mediaURL) {
        //   if (item.mediaURL.endsWith('.mp3')) {
        //     item.MIMEType = 'audio/mpeg'
        //   }
        //   else if (item.mediaURL.endsWith('.mp4')) {
        //     item.MIMEType = 'video/mp4'
        //   }
        // }
        
        let description = []
        let descriptionHTML = []
        // if (subtitles) {
        //   description.push(subtitles.join('\n'))
        //   descriptionHTML.push(subtitles.join('<br />\n'))
        // }
        if (item.description) {
          description.push(item.description)
          descriptionHTML.push(linkifyUrls(item.description.split("\n").join("\n<br />")))
        }
        // if (thumnails) {
        //   description.unshift(thumnails)
        //   descriptionHTML.unshift(thumnails)
        // }

        // -----------------------------
        
        // let title = item.title
        // let d = moment(item.date).format('M.D')
        // title = '' + d + ']' + title
        
        let thumbnailHTML = ''
        if (item.thumbnail) {
          thumbnailHTML = `<itunes:image href="${item.thumbnail}"/>
          <media:content url="${item.thumbnail}" medium="image"/>`
        }


        output.push(`<item>
    <title><![CDATA[${title}]]></title>
    <link>${link}</link>
    <itunes:title><![CDATA[${title}]]></itunes:title>
    <itunes:author><![CDATA[${item.author}]]></itunes:author>
    <itunes:summary>
      <![CDATA[${description.join('\n')}]]>
    </itunes:summary>
    <description>
      <![CDATA[${description.join('\n')}]]>
    </description>
    <content:encoded><![CDATA[${description.join('<br />\n')}]]></content:encoded>
    ${thumbnailHTML}
    <pubDate>${item.date}</pubDate>
  </item>`)
      }
      
        
    }
  }
}

module.exports = main