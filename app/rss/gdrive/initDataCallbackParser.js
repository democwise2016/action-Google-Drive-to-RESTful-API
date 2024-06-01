module.exports = function (data, mime, type = 'file') {
  let result = []
  let parts = data.split(`,null,"${mime}",1,["`)
  for (let i = 1; i < parts.length; i++) {
    let id = parts[i].slice(0, parts[i].indexOf('"'))
    result.push(`https://drive.google.com/file/d/${id}/view?usp=sharing`)
  }
  result = [...new Set(result)]

  result = result.map(link => {
    return {
      type,
      link
    }
  })

  return result
}