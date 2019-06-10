function decrypt(str, pt) {
  const rule = [
    {
      from: 4,
      to: 22
    },
    {
      from: 3,
      to: 28
    },
    {
      from: 30,
      to: 11
    },
    {
      from: 8,
      to: 27
    },
    {
      from: 29,
      to: 7
    }
  ]
  pt = pt[0]
  const char1 = str[rule[pt].to - 1]
  const char2 = str[rule[pt].from - 1]

  str = replaceStr(str, char1, rule[pt].from)
  str = replaceStr(str, char2, rule[pt].to)

  return str
}

// 替换第index位的字符，
function replaceStr(str, char, index) {
  return str.substr(0, index - 1) + char + str.substr(index, str.length)
}

module.exports = decrypt
