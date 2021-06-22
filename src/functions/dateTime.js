const date = (unix) => {
  return new Date(unix * 1000).toLocaleDateString('en-US')
}

const time = (unix) => {
  return (
    new Date(unix * 1000)
      .toLocaleTimeString('en-US')
      .split(' ')[0]
      .split(':')[0] +
    new Date(unix * 1000).toLocaleTimeString('en-US').split(' ')[1]
  )
}

module.exports.time = time
module.exports.formateDate = date
