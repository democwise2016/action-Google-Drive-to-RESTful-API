module.exports = function(content) {
  let pos1 = content.indexOf('\n')

  if (pos1 === -1) {
    return content  
  }

  let part1 = content.slice(0, pos1 + 1)

  let pos2 = content.indexOf('\n--\n<span>※ 發信站: 批踢踢實業坊(ptt.cc), 來自: ')
  if (pos2 === -1) {
    return content
  }

  let part3 = content.slice(pos2 + 3)

  let part2 = content.slice(pos1 + 1, pos2 + 3)

  part2 = part2.split('\n').join('<br />\n')

  return part2 + `<br /><hr />` + part3
}