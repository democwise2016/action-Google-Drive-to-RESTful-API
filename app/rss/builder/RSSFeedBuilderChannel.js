const CONFIG = require('./../../../config.js')
const getRedirectedURL = require('./getRedirectedURL.js')

let main = async function (options) {
  if (options.title) {
    options.title = options.title + CONFIG.titleAppend
  }

  if (!options.author) {
    options.author = options.title
  }
  
  if (!options.language) {
    options.language = 'en-us'
  }
  
  if (!options.thumbnail) {
    // https://unsplash.it/800/800?random
    options.thumbnail = await getRedirectedURL('https://unsplash.it/800/800?random')
  }

  // console.log(options.thumbnail, options.thumbnailBorderColor, CONFIG.thumbnailBorderColor)
  if (options.thumbnail && options.thumbnail.startsWith('https://') && (options.thumbnail.indexOf('=s1024-c-k-') > -1) && options.thumbnailBorderColor) {
    // console.log(options.thumbnailBorderColor, CONFIG.thumbnailBorderColor)
    if (options.thumbnailBorderColor === CONFIG.thumbnailBorderColor) {
      options.thumbnail = options.thumbnail.split('=s1024-c-k-').join('=s1024-b50-c-k-')
    }
    else {
      options.thumbnail = options.thumbnail.split('=s1024-c-k-').join('=s1024-b100-c-k-')
    }
    options.thumbnail = options.thumbnail.split('c0x00ffffff-no-rj').join(`c0x00${options.thumbnailBorderColor}-no-rj`)
  }
  
  if (!options.link && options.feedLink) {
    options.link = options.feedLink
  }
  if (!options.url && options.feedUrl) {
    options.url = options.feedUrl
  }
  
  if (options.description) {
    if (options.description.startsWith('http') && options.description.indexOf('\n') === -1) {
      options.description = `<a href="${options.description}" target="_blank">${options.description}</a>`
    }
    
    options.description = options.description.trim().split('\\n').join('\n').trim()
  }
  else if (options.link) {
    options.description = `<a href="${options.link}" target="_blank">${options.link}</a>`
  }
  
  if (options.feedURL) {
    options.description = options.description 
            + '<br />\n' 
            + '<br />\n' 
            //+ options.feedURL
            + `<a href="${options.feedURL}" target="_blank">${options.feedURL}</a>`
  }
  
  //console.log(options)

  return `<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:media="http://www.rssboard.org/media-rss" version="2.0">
  <channel>
    <title><![CDATA[${options.title}]]></title>
    <link>${options.url}</link>
    <image>
      <url>${options.thumbnail}</url>
      <title>${options.title}</title>
      <link>${options.url}</link>
    </image>
    <language>${options.language}</language>
    <atom:link href="${options.feedLink}" rel="self" type="application/rss+xml"/>
    <copyright><![CDATA[${options.author}]]></copyright>
    <itunes:author><![CDATA[${options.author}]]></itunes:author>
    <itunes:summary>
      <![CDATA[
      ${options.description}
      ]]>
    </itunes:summary>
    <description>
      <![CDATA[
      ${options.description}
      ]]>
    </description>
    <itunes:owner>
      <itunes:name><![CDATA[${options.author}]]></itunes:name>
    </itunes:owner>
    <itunes:image href="${options.thumbnail}"/>
`
}

module.exports = main